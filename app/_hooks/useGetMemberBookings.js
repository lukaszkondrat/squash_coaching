import { useQuery } from '@tanstack/react-query'
import { getMemberBookings } from '@/app/_lib/data-service'

export function useGetMemberBookings(memberId) {
  const { data: bookings, isLoading, error } = useQuery({
    queryKey: ['bookings', memberId],
    queryFn: () => getMemberBookings(memberId),
    enabled: !!memberId,
  })

  return { bookings, isLoading, error }
}