import { postStar } from '@/api/service'
import { Star } from '@/types'
import { UseMutationOptions, useMutation } from 'react-query'

type UsePostStarProps = Omit<
  UseMutationOptions<
    { role: 'assistant' | 'user' | 'system'; content: string } | undefined,
    unknown,
    Star,
    unknown
  >,
  'mutationFn'
>

const usePostStar = ({ ...options }: UsePostStarProps) => {
  return useMutation(postStar, { ...options })
}

export default usePostStar
