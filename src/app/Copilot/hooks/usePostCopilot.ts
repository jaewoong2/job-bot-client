import api from '@/api'
import { ChatGPTResponse, Copilot } from '@/types'
import useSWRMutation from 'swr/mutation'

const fetcher: (url: string, { arg }: { arg: Copilot }) => Promise<ChatGPTResponse> = async (url, { arg }) => {
  const response = await api.request<Copilot, ChatGPTResponse>({
    url,
    method: 'POST',
    data: arg,
  })

  return response.data
}

const usePostCopilot = () => {
  return useSWRMutation<ChatGPTResponse, any, string, Copilot>('copilot', fetcher)
}

export default usePostCopilot
