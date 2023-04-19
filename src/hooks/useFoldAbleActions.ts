import { FoldAbleActionsContext } from '@/components/contexts/FoldAbleContext'
import { useContext } from 'react'

const useFoldAbleActions = () => {
  const actions = useContext(FoldAbleActionsContext)
  if (actions === undefined) {
    throw new Error('useFoldAbleActions should be used within FoldAbleActionsContext')
  }
  return actions
}

export default useFoldAbleActions
