import * as React from "react"
import "./LoginForm.css"
import axios from "axios"

export default function LoginForm({handleLogin}) {
    const username = React.createRef();
    const password = React.createRef();

    const handleSubmit = event => {
        event.preventDefault();

        const login = async () => {
            try {
                console.log("Logging in")
                const res = await axios.post("http://localhost:3001/login", {
                    "username" : username.current.value,
                    "password" : password.current.value
                    }, 
                    { withCredentials: true })                
                handleLogin(res.data.user)    
            } catch (err) {
                alert(err)
                console.log(err)
            }
        }
        login()
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <div className="title">Login</div>
        <label>
          <span>Username</span>
          <input ref={username}></input>
        </label>
        <label>
          <span>Password</span>
          <input type="password" ref={password}></input>
        </label>
        <button type="submit">Login</button>
      </form>
    )
}