import { useEffect } from 'react'
import { useEvent } from './useEvent.js'
import { useDebounce } from './useDebounce.js'

// Todo: allow for an optional proxy for cors
// Creates an eventsource that saves the event to local event state
const useFirebase = (project, path = '/') => {
  const endpoint = `https://${project}.firebaseio.com/${path}.json`
  const [event, setEvent] = useDebounce(null, 3000)
  const source = new EventSource(endpoint)
  // On server put, update local event
  useEvent('put', ({ data }) => setEvent(JSON.parse(data).data), source)

  // After the debounced event changes, send it to the server
  useEffect(() => {
    if (event) {
      sendEvent(event)
    }
    return () => { /* cancel previous fetches here? */ }
  }, [event])

  // Update the event on firebase side
  const sendEvent = data => {
    const options = {
      method: `PUT`,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include'
    }
    fetch(`/${path}.json?print=silent`, options)
  }

  return [event, setEvent]
}

export { useFirebase }
