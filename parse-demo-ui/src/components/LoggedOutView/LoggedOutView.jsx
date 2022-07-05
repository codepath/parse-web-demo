import * as React from "react"
import LoginForm from "../LoginForm/LoginForm"
import RegisterForm from "../RegisterForm/RegisterForm"
import "./LoggedOutView"

export default function LoggedOutView({handleLogin}) {
    return (
        <div>
            <LoginForm handleLogin={handleLogin} />
            <RegisterForm handleLogin={handleLogin} />
        </div>
    )
}