import { useQuery } from '@tanstack/react-query'
import { getMemberBookings } from '@/app/_lib/data-service'
import { toast } from 'react-hot-toast'

export function useGetMemberBookings(memberId) {
  const { data: bookings, isLoading, error } = useQuery({
    queryKey: ['bookings', memberId],
    queryFn: () => getMemberBookings(memberId),
    onError: () => {
      toast.error('Error fetching member bookings')
    }
  })

  return { bookings, isLoading, error }
}