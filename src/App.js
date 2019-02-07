import React, { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import { useFirebase } from './hooks/useFirebase.js'

const App = () => {
  const [state, setState] = useFirebase(`catch-of-the-day-92a28`, `scratch`)
  let firstName

  useEffect(() => {
    firstName = state && state.firstName
  }, [state])

  const handleChange = event => {
    const { name, value } = event.currentTarget

    setState({
      ...state,
      [name]: value
    })
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Event: <code>{JSON.stringify(state)}</code>
        </p>
        <input
          name='firstName'
          type='text'
          required
          placeholder='firstName'
          onChange={handleChange}
          value={firstName}
        />
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
