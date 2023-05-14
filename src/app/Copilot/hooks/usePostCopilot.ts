import { ChatGPTResponse, Copilot } from '@/types'
import useSWRMutation from 'swr/mutation'

const fetcher: (url: string, { arg }: { arg: Copilot }) => Promise<ChatGPTResponse> = async (url, { arg }) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
    headers: { Authorization: process.env.NEXT_PUBLIC_SUPABASE_JWT! },
  })

  return response.json()
}

const URL = process.env.NODE_ENV === 'development' ? 'api/' : process.env.NEXT_PUBLIC_ENDPOINT_URL_PRODUCTION!

const usePostCopilot = () => {
  return useSWRMutation<ChatGPTResponse, any, string, Copilot>(URL + 'copilot', fetcher)
}
export default usePostCopilot
