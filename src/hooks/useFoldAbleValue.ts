import { useContext } from 'react'
import { FoldAbleValueContext } from '@/components/contexts/FoldAbleContext'

const useFoldAbleValue = () => {
  const value = useContext(FoldAbleValueContext)
  if (value === undefined) {
    throw new Error('useFoldAbleValue should be used within FoldAbleValueContext')
  }
  return value
}

export default useFoldAbleValue
