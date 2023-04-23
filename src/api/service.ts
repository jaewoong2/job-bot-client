import { Star, Feedback } from '@/types'
import { AxiosError } from 'axios'
import instance from './instance'

export const postStar = async (star: Star & { temperature: number }) => {
  try {
    const response = await instance.post<{
      role: 'assistant' | 'user' | 'system'
      content: string
    }>('/openai/star', star)

    if (response.status > 299) {
      throw new AxiosError('Unknwon Error...')
    }

    return response.data
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error(err.message)
      throw err
    }
    console.error('Something Wrong...')
    throw err
  }
}

export const postFeedback = async (star: Feedback & { temperature: number }) => {
  try {
    const response = await instance.post<{
      role: 'assistant' | 'user' | 'system'
      content: string
    }>('/openai/feedback', star)

    if (response.status > 299) {
      throw new AxiosError('Unknwon Error...')
    }

    return response.data
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error(err.message)
      throw err
    }
    console.error('Something Wrong...')
    throw err
  }
}
