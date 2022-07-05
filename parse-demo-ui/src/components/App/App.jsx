import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import './App.css'
import NavBar from '../NavBar/NavBar'
import LoggedOutView from '../LoggedOutView/LoggedOutView'
import MessagesView from '../MessagesView/MessagesView'

function App() {
  const [cookies, setCookie, removeCookie] = useCookies()
  const [isLoggedIn, setIsLoggedIn] = useState(cookies.current_user_id !== undefined)

  const handleLogout = () => {
    removeCookie("current_user_id")
    setIsLoggedIn(false)
  }

  const handleLogin = (user) => {
    console.log(user)
    setIsLoggedIn(true)
  }

  return (
    <div className="App">
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      {isLoggedIn
        ? <MessagesView />
        : <LoggedOutView handleLogin={handleLogin} />
      }
    </div>
  )
}

export default App
