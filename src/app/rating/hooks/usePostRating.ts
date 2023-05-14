import { ChatGPTResponse, Rating } from '@/types'
import useSWRMutation from 'swr/mutation'

const fetcher: (url: string, { arg }: { arg: Rating }) => Promise<ChatGPTResponse> = async (url, { arg }) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ ...arg, maxTokens: 1 }),
    headers: { Authorization: process.env.NEXT_PUBLIC_SUPABASE_JWT! },
  })

  return response.json()
}

const URL = process.env.NODE_ENV === 'development' ? 'api/' : process.env.NEXT_PUBLIC_ENDPOINT_URL_PRODUCTION!

const usePostRating = () => {
  return useSWRMutation<ChatGPTResponse, Error, string, Rating>(URL + 'pnf', fetcher)
}
export default usePostRating
