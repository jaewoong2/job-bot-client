import { postPnf } from '@/api/service'
import { Pnf } from '@/types'
import { AxiosError } from 'axios'
import { UseMutationOptions, useMutation } from 'react-query'

type UsePostPnfProps = Omit<
  UseMutationOptions<
    { role: 'assistant' | 'user' | 'system'; content: string } | undefined,
    AxiosError,
    Pnf,
    unknown
  >,
  'mutationFn'
>

const usePostPnf = (temperature: number, { ...options }: UsePostPnfProps) => {
  return useMutation((contents) => postPnf({ ...contents, temperature }), { ...options })
}

export default usePostPnf
