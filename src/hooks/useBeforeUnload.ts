import { useEffect } from 'react'

function useBeforeUnload(enabled: boolean, message = 'Changes you made may not be saved.'): void {
  useEffect(() => {
    if (enabled) {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        const e = event || window.event

        // For legacy browsers
        if (e) {
          e.preventDefault()
          e.returnValue = message
        }

        // For modern browsers
        return message
      }
      window.addEventListener('beforeunload', handleBeforeUnload)

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload)
      }
    }
  }, [enabled, message])
}

export default useBeforeUnload
