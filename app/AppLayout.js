'use client'

import { useState, Suspense } from "react"
import { QueryClient, QueryCache, MutationCache, QueryClientProvider } from "@tanstack/react-query"
import { toast, Toaster } from "react-hot-toast"
import { AuthProvider } from "@/app/_components/AuthProvider"
import Header from "@/app/_components/Header"
import LoadingBar from "@/app/_components/LoadingBar"

import { Josefin_Sans } from "next/font/google"

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
})

export default function AppLayout({ children }) {
  const [queryClient] = useState(() =>
    new QueryClient({
      queryCache: new QueryCache({
        onError: (error, query) => {
          const isMemberQuery = query.queryKey?.[0] === 'auth' && query.queryKey?.[1] === 'member'
          const isMemberBookingsQuery = query.queryKey?.[0] === 'bookings' && query.queryKey?.[1] !== undefined
      
          if (isMemberQuery && error?.message?.includes('Member could not be loaded')) {
            if (query.state.fetchFailureCount >= 3) {
              toast.error(`An error occurred: ${error.message}`)
            }
            return
          }
          if (isMemberBookingsQuery && error?.message?.includes('Bookings could not be loaded')) {
            return
          }
          toast.error(`An error occurred: ${error.message}`)
        }
      }),
      mutationCache: new MutationCache({
        onError: (error) =>
          toast.error(`An error occurred: ${error.message}`)
      }),
      defaultOptions: {
        queries: {
          staleTime: 0,
          retry: false,
        },
        mutations: {
          retry: false
        }
      },
      staleTime: 1000 * 60 * 5,
    })
  );
  return (
    <html lang="en">
      <body className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Suspense fallback={null}>
              <LoadingBar />
            </Suspense>
            <Header />
            <div className="flex-1 px-8 py-12">
              <main className="max-w-7xl mx-auto">
                {children}
              </main>
            </div>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#D4DEE7',
                  color: '#141C24',
                  border: '1px solid #5E82A6',
                },
                success: {
                  iconTheme: {
                    primary: '#C69963',
                    secondary: '#E1E8EF',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#E1E8EF',
                  },
                },
              }}
            />
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}