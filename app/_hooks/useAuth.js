'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCurrentSession, getMember, signOut as signOutService, onAuthStateChange } from '@/app/_lib/data-service'
import { useEffect } from 'react'

export function useAuth() {
  const queryClient = useQueryClient()

  const { data: session, isLoading: sessionLoading } = useQuery({
    queryKey: ['auth', 'session'],
    queryFn: getCurrentSession,
    staleTime: 1000 * 60 * 5,
    retry: false,
  })

  const { data: member, isLoading: memberLoading } = useQuery({
    queryKey: ['auth', 'member', session?.user?.email],
    queryFn: () => getMember(session.user.email),
    enabled: !!session?.user?.email,
    staleTime: 1000 * 60 * 10,
  })

  const signOutMutation = useMutation({
    mutationFn: signOutService,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['auth'] })
      queryClient.setQueryData(['auth', 'session'], null)
      queryClient.setQueryData(['auth', 'member'], null)
    },
  })

  useEffect(() => {
    const { data: { subscription } } = onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        queryClient.setQueryData(['auth', 'session'], session)
        if (session?.user?.email) {
          queryClient.prefetchQuery({
            queryKey: ['auth', 'member', session.user.email],
            queryFn: () => getMember(session.user.email),
          })
        }
      } else if (event === 'SIGNED_OUT') {
        queryClient.setQueryData(['auth', 'session'], null)
        queryClient.setQueryData(['auth', 'member'], null)
      }
    })

    return () => subscription.unsubscribe()
  }, [queryClient])

  const signOut = () => {
    signOutMutation.mutate()
  }

  return {
    user: session?.user ?? null,
    member: member ?? null,
    loading: sessionLoading || memberLoading,
    signOut,
    isSigningOut: signOutMutation.isPending,
  }
} 