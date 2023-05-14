import { ChatGPTResponse, Star } from '@/types'
import useSWRMutation from 'swr/mutation'

const fetcher: (url: string, { arg }: { arg: Star }) => Promise<ChatGPTResponse> = async (url, { arg }) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ ...arg, maxTokens: 1 }),
    headers: { Authorization: process.env.NEXT_PUBLIC_SUPABASE_JWT! },
  })

  return response.json()
}

const URL = process.env.NODE_ENV === 'development' ? 'api/' : process.env.NEXT_PUBLIC_ENDPOINT_URL_PRODUCTION!

const usePostStar = () => {
  return useSWRMutation<ChatGPTResponse, Error, string, Star>(URL + 'star', fetcher)
}
export default usePostStar
