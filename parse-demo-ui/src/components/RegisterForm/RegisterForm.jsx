import * as React from "react"
import "./RegisterForm.css"
import axios from "axios"
import * as config from '../../config'

export default function RegisterForm({ handleLogin }) {
    const username = React.createRef();
    const password = React.createRef();

    const handleSubmit = event => {
        event.preventDefault();

        const register = async () => {
            try {
                const res = await axios.post(`${config.API_BASE_URL}/register`, {
                    "username" : username.current.value,
                    "password" : password.current.value
                    })
                handleLogin(res.data.user)    
            } catch (err) {
                alert(err)
                console.log(err)
            }
        }
        register()
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="title">Register</div>
            <label>
                <span>Username</span>
                <input ref={username}></input>
            </label>
            <label>
                <span>Password</span>
                <input type="password" ref={password}></input>
            </label>
            <button type="submit">Register</button>
        </form>        
    )
}