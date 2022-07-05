const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')
const Parse = require('parse/node')

const app = express()
const port = 3001

app.use(express.json())
app.use(morgan("tiny"))
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}))
app.use(cookieParser())

Parse.initialize("tTuMvRk2Lg9C9M73D22bQmdPHzaS3jDILHkuFREj", "ip8i2juqzXROxsZJXdCqW2KKNsFxcQHfvsvZCHDq")
Parse.serverURL = "https://parseapi.back4app.com"

app.post('/register', async (req, res) => {
  let user = new Parse.User(req.body)

  try {
      await user.signUp()
      res.cookie("current_user_id", user.objectId, { maxAge: 315360000000 })
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
    res.cookie("current_user_id", user.id, { maxAge: 315360000000 })
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
    
    currentUserId = req.cookies["current_user_id"]
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
  console.log(`Example app listening on port ${port}`)
})
