import api from '@/api'
import { ChatGPTResponse, Feedback } from '@/types'
import useSWRMutation from 'swr/mutation'

const fetcher: (url: string, { arg }: { arg: Feedback }) => Promise<ChatGPTResponse> = async (url, { arg }) => {
  const response = await api.request<Feedback, ChatGPTResponse>({
    url,
    method: 'POST',
    data: arg,
  })

  return response.data
}

const usePostFeedback = () => {
  return useSWRMutation<ChatGPTResponse, Error, string, Feedback>('feedback', fetcher)
}
export default usePostFeedback
