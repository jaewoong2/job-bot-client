import { postStar } from '@/api/service'
import { useMutation } from 'react-query'

const usePostStar = () => {
  return useMutation(postStar, {
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error: Error) => {
      console.error(error)
    },
  })
}

export default usePostStar
