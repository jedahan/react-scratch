import { useEffect } from 'react'

const useEvent = (event, handler, source = window) => {
  useEffect(
    () => {
      source.addEventListener(event, handler)
      return () => source.removeEventListener(event, handler)
    },
    [handler]
  )
}

export { useEvent }
