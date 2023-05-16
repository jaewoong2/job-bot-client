import api from '@/api'
import { ChatGPTResponse, Title } from '@/types'
import useSWRMutation from 'swr/mutation'

const fetcher: (url: string, { arg }: { arg: Title }) => Promise<ChatGPTResponse> = async (url, { arg }) => {
  const response = await api.request<Title, ChatGPTResponse>({
    url,
    method: 'POST',
    data: arg,
  })

  return response.data
}

const usePostTitle = () => {
  return useSWRMutation<ChatGPTResponse, Error, string, Title>('title', fetcher)
}
export default usePostTitle
