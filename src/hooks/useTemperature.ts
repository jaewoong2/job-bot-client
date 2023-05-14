import { createContext, useContext } from 'react'

export const temperatureContext = createContext({ temperature: 50 })

const useTemperature = () => {
  const value = useContext(temperatureContext)
  if (value === undefined) {
    throw new Error('useFoldAbleValue should be used within FoldAbleValueContext')
  }
  return value
}

export default useTemperature
