import api from '@/api'
import { ChatGPTResponse, Rating } from '@/types'
import useSWRMutation from 'swr/mutation'

const fetcher: (url: string, { arg }: { arg: Rating }) => Promise<ChatGPTResponse> = async (url, { arg }) => {
  const response = await api.request<Rating, ChatGPTResponse>({
    url,
    method: 'POST',
    data: arg,
  })

  return response.data
}

const usePostRating = () => {
  return useSWRMutation<ChatGPTResponse, Error, string, Rating>('pnf', fetcher)
}
export default usePostRating
