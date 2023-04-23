import { useCallback, useState } from 'react'

type SetValue<T> = (value: T | ((val: T) => T)) => void

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue: SetValue<T> = useCallback(
    (value) => {
      try {
        const valueToStore = (value instanceof Function ? value(storedValue) : value) as T
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.log(error)
      }
    },
    [storedValue]
  )

  return [storedValue, setValue]
}

export default useLocalStorage
