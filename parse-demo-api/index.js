const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Parse = require('parse/node')
const {PARSE_APP_ID, PARSE_JAVASCRIPT_KEY} = require('./config')

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())

Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY)
Parse.serverURL = "https://parseapi.back4app.com"

app.post('/register', async (req, res) => {
  let user = new Parse.User(req.body)

  try {
      await user.signUp()
      res.send({"user" : user})
  } catch (error) {
      res.status(400)
      res.send({"error" : "Failed to create user: " + error })
  }
})

app.post('/login', async (req, res) => {
  try {
    const user = await Parse.User.logIn(req.body.username, req.body.password)
    res.status(201)
    res.send({"user" : user})
  } catch (error) {
    res.status(400)
    res.send({"error" : "Login failed: " + error })
  }
})

app.get('/messages', async (req, res) => {
  try {
    const query = new Parse.Query("Messages")

    query.descending("createdAt")
    query.include("user")

    messages = await query.find()

    res.send({"messages" : messages})
  } catch (error) {
    res.status(400)
    res.send({"error" : "Message query failed: " + error })
  }
})

app.post('/messages', async (req, res) => {
  try {
    const message = new Parse.Object("Messages", req.body)
    
    currentUserId = req.headers["current_user_id"]
    const user = new Parse.User()
    user.id = currentUserId
    
    message.set("user", user)

    await message.save()
    res.status(201)
    res.send({"message" : message})
  } catch (error) {
    res.status(400)
    res.send({"error" : "Create message failed: " + error })
  }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Parse Web Demo app listening on port ${port}`)
})
