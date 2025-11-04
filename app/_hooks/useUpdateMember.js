import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateMember as updateMemberService } from "@/app/_lib/data-service"
import { toast } from "react-hot-toast"

export function useUpdateMember() {
  const queryClient = useQueryClient()

  const { mutate: updateMember, isLoading, error } = useMutation({
    mutationFn: ({ email, updatedMember }) => updateMemberService(email, updatedMember),
    onSuccess: () => {
      toast.success('Profile updated successfully')
      queryClient.invalidateQueries({ queryKey: ['auth', 'member'] })
      queryClient.invalidateQueries({ queryKey: ['members'] })
    },
    onError: () => {
      toast.error('Error updating profile')
    }
  })

  return { updateMember, isLoading, error }
}