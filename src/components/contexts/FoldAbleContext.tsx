import React, { PropsWithChildren, createContext, useCallback, useMemo, useState } from 'react'

type Actions = {
  show: () => void
  hide: () => void
  toggle: () => void
}
export const FoldAbleValueContext = createContext<{ isFold: boolean; fold: boolean }>({
  isFold: false,
  fold: false,
})

export const FoldAbleActionsContext = createContext<Actions>({
  show: () => {},
  hide: () => {},
  toggle: () => {},
})

const FoldAbleContext = ({ children }: PropsWithChildren<{}>) => {
  const [isFold, setIsFold] = useState(false)
  const [fold, setFold] = useState(false)

  const show = useCallback(() => {
    setFold(false)
    setTimeout(() => {
      setIsFold(false)
    }, 400)
  }, [])

  const hide = useCallback(() => {
    setFold(true)
    setTimeout(() => {
      setIsFold(true)
    }, 400)
  }, [])

  const toggle = useCallback(() => {
    setFold((prev) => !prev)
    setTimeout(() => {
      setIsFold((prev) => !prev)
    }, 400)
  }, [])

  const value = useMemo(() => ({ isFold, fold }), [isFold, fold])
  const action = useMemo(() => ({ show, hide, toggle }), [show, hide, toggle])

  return (
    <FoldAbleActionsContext.Provider value={action}>
      <FoldAbleValueContext.Provider value={value}>{children}</FoldAbleValueContext.Provider>
    </FoldAbleActionsContext.Provider>
  )
}

export default FoldAbleContext
