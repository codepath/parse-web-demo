import * as React from "react"
import "./MessagesView.css"
import axios from "axios"

export default function MessagesView() {
    const [newMessage, setNewMessage] = React.useState("")
    const [messages, setMessages] = React.useState([])

    const onChange = (event) => {
        setNewMessage(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setNewMessage("")

        const post = (async () => {
            const res = await axios.post("http://localhost:3001/messages", {
                "text" : newMessage,
                }, 
                { withCredentials: true }
            )
            
            setMessages([res.data.message].concat(messages))
        })()
    }

    React.useEffect(() => {
        const fetchMessages = (async () => {
          try {
            const res = await axios.get("http://localhost:3001/messages", 
                { withCredentials: true }
            )
            setMessages(res.data.messages)
          } catch (err) {
            console.log(err)
          }
        })()
    }, [])

    return (
        <div className="MessagesView">
            <form onSubmit={handleSubmit} >
                <input value={newMessage} onChange={onChange} placeholder="Add a quote here"></input>
                <button type="submit">Post</button>
            </form>
            <div className="MessagesList">
                {messages.map((message) => {
                    return <div className="MessageItem" key={message.objectId}>{message.text}</div>
                })}
            </div>
        </div>
    )
}