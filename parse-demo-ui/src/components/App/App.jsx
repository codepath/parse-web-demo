import { useState, useEffect } from 'react'
import './App.css'
import NavBar from '../NavBar/NavBar'
import LoggedOutView from '../LoggedOutView/LoggedOutView'
import MessagesView from '../MessagesView/MessagesView'
import axios from "axios"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("current_user_id") !== null)

  // For every network request, add a custom header for the logged in user
  // The backend API can check the header for the user id
  //
  // Note: This isn't a secure practice, but is convenient for prototyping.
  // In production, you would add an access token instead of (or in addition to)
  // the user id, in order to authenticate the request
  const addAuthenticationHeader = () => {
    const currentUserId = localStorage.getItem("current_user_id")
    if (currentUserId !== null) {
      axios.defaults.headers.common = {
        "current_user_id": currentUserId
      };
    }
  }
  addAuthenticationHeader()

  const handleLogout = () => {
    localStorage.removeItem("current_user_id")
    axios.defaults.headers.common = {};
    setIsLoggedIn(false)
  }

  const handleLogin = (user) => {
    console.log(user)
    localStorage.setItem("current_user_id", user["objectId"])
    addAuthenticationHeader()

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
