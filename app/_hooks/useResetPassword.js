import { toast } from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { resetPassword as resetPasswordService } from '@/app/_lib/data-service'

export function useResetPassword() {
  const { mutate: resetPassword, isPending, error } = useMutation({
    mutationFn: (email) => resetPasswordService(email),
    onSuccess: () => {
      toast.success('Password reset email sent! Please check your inbox.')
    },
    onError: (error) => {
      console.error('Reset password error:', error)
      toast.error('Failed to send reset email. Please try again.')
    }
  })

  return { resetPassword, isPending, error }
} 