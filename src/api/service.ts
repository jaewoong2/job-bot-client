import { Star, Feedback, Pnf, Copilot } from '@/types'
import { AxiosError } from 'axios'
import instance from './instance'

export const postStar = async (star: Star & { temperature: number }) => {
  try {
    const response = await instance.post<{
      role: 'assistant' | 'user' | 'system'
      content: string
    }>('/star', star)

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
    }>('/feedback', star)

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

export const postPnf = async (data: Pnf & { temperature: number }) => {
  try {
    const response = await instance.post<{
      role: 'assistant' | 'user' | 'system'
      content: string
    }>('/pnf', data)

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

export const postCopilot = async (data: Copilot & { temperature: number }) => {
  try {
    const response = await instance.post<{
      role: 'assistant' | 'user' | 'system'
      content: string
    }>('/copilot', data)

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
