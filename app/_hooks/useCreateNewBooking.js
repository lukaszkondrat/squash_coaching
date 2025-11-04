import { toast } from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBooking } from '@/app/_lib/data-service'

export function useCreateNewBooking() {
  const queryClient = useQueryClient()
  
  const { mutate: createNewBooking, isLoading, error } = useMutation({
    mutationFn: (booking) => createBooking(booking),
    onSuccess: () => {
      toast.success('Booking created successfully')
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
    onError: () => {
      toast.error('Error creating booking')
    }
  })

  return { createNewBooking, isLoading, error }
}