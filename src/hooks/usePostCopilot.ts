import { postCopilot } from '@/api/service'
import { Copilot } from '@/types'
import { AxiosError } from 'axios'
import { UseMutationOptions, useMutation } from 'react-query'

type UsePostCopilotProps = Omit<
  UseMutationOptions<
    { role: 'assistant' | 'user' | 'system'; content: string } | undefined,
    AxiosError,
    Copilot,
    unknown
  >,
  'mutationFn'
>

const usePostCopilot = (temperature: number, { ...options }: UsePostCopilotProps) => {
  return useMutation((contents) => postCopilot({ ...contents, temperature }), { ...options })
}

export default usePostCopilot
