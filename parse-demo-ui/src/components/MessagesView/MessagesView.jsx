import * as React from "react"
import "./MessagesView.css"
import axios from "axios"
import * as config from '../../config'

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
            const res = await axios.post(`${config.API_BASE_URL}/messages`, {
                "text" : newMessage,
                })
            
            setMessages([res.data.message].concat(messages))
        })()
    }

    React.useEffect(() => {
        const fetchMessages = (async () => {
          try {
            const res = await axios.get(`${config.API_BASE_URL}/messages`)
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