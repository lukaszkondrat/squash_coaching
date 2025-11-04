import { toast } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { getAllBookings } from '@/app/_lib/data-service'

export function useGetAllBookings() {
  const { data: bookings, isLoading, error } = useQuery({
    queryKey: ['bookings'],
    queryFn: () => getAllBookings(),
    onError: () => {
      toast.error('Error fetching all bookings')
    }
  })

  return { bookings, isLoading, error }
}