import * as React from "react"
import "./NavBar.css"

export default function NavBar({ isLoggedIn, handleLogout }) {
    const onClick = event => {
        event.preventDefault();
        handleLogout()
    }

    return (
        <div id="NavBar">
            <span>Parse Demo</span>
            {isLoggedIn &&
                <a href="#" onClick={onClick}>Logout</a>
            }
        </div>
    )
}