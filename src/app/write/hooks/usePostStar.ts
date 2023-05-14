import api from '@/api'
import { ChatGPTResponse, Star } from '@/types'
import useSWRMutation from 'swr/mutation'

const fetcher: (url: string, { arg }: { arg: Star }) => Promise<ChatGPTResponse> = async (url, { arg }) => {
  const response = await api.request<Star, ChatGPTResponse>({
    url,
    method: 'POST',
    data: arg,
  })

  return response.data
}

const usePostStar = () => {
  return useSWRMutation<ChatGPTResponse, Error, string, Star>('star', fetcher)
}
export default usePostStar
