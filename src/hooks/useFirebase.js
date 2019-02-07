import { useState, useEffect } from 'react'
import { useEvent } from './useEvent.js'
import { useDebounce } from 'use-debounce'

// Todo: allow for an optional proxy for cors
// Creates an eventsource that saves the event to local event state
const useFirebase = (project, path = '/') => {
  const endpoint = `https://${project}.firebaseio.com/${path}.json`
  const [event, setEvent] = useState()
  const source = new EventSource(endpoint)
  // On server put, update local event
  useEvent('put', ({ data }) => setEvent(JSON.parse(data).data), source)

  const debouncedEvent = useDebounce(event, 3000)

  // After the debounced event changes, send it to the server
  useEffect(() => {
    if (debouncedEvent) {
      sendEvent(debouncedEvent)
    }
  }, [debouncedEvent])

  // Update the event on firebase side
  const sendEvent = data => {
    const options = {
      method: `PUT`,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include'
    }
    fetch(`/${path}.json`, options)
  }

  return [debouncedEvent, setEvent]
}

export { useFirebase }
