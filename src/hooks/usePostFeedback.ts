import { AxiosError } from 'axios'
import { postFeedback } from '@/api/service'
import { Feedback } from '@/types'
import { UseMutationOptions, useMutation } from 'react-query'

type UsePostFeedbackProps = Omit<
  UseMutationOptions<
    { role: 'assistant' | 'user' | 'system'; content: string } | undefined,
    AxiosError,
    Feedback,
    unknown
  >,
  'mutationFn'
>

const usePostFeedback = (temperature: number, { ...options }: UsePostFeedbackProps) => {
  return useMutation((feedback) => postFeedback({ temperature, ...feedback }), { ...options })
}

export default usePostFeedback
