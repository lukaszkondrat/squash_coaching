import AppLayout from "@/app/AppLayout"
import "@/app/_styles/globals.css"

export const metadata = {
  title: "Elite squash coaching in Singapore with Lukasz Kondratowicz",
  description: `Learn to get better at squash with Lukasz Kondratowicz. We offer private and group coaching sessions for all levels of players. 
  Run by a coach who has more than 15 years of experience in the sport and has coached players in Poland, UK and Singapore.`,
  keywords: "squash, coaching, Singapore, private, Lukasz Kondratowicz, group, elite, beginner, intermediate, advanced",
  robots: "index, follow",
  openGraph: {
    title: "Elite squash coaching in Singapore with Lukasz Kondratowicz",
    description: `Learn to get better at squash with Lukasz Kondratowicz. We offer private and group coaching sessions for all levels of players. 
  Run by a coach who has more than 15 years of experience in the sport and has coached players in Poland, UK and Singapore.`,
    url: "https://www.singaporesquashcoach.com",
    siteName: "LK Squash Coaching"
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({ children }) {
  return (
    <AppLayout>
      {children}
    </AppLayout>
  )
}