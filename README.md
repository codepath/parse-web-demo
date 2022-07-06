# Parse Web Demo

This is a demo of a React and Express app that uses Parse as the backend. The app demonstrates the following use cases:

1. User login and registration
2. Adding data to a table
3. Querying a table
4. Persisting a logged in user

This app is a simple message board. You can login or register a new user. Once you're logged in, it displays a list of messages. You can post your own message, which will be added to the page.

<img src="https://i.imgur.com/2l6nR6A.gif" />

You can tinker with the deployed app here: https://codepath-parse-web-demo.surge.sh/. Quotes will be visible to everyone, so please add a quote you like!

## Running Locally

The repo contains an Express app that routes for logging in, creating a user, getting messages, and creating a new message. Before you can run the Express, you have to set up a Parse server.

To set up a Parse server, go to https://back4app.com. On the Back4App dashboard, click on your app, then App Settings->Security & Keys, and note the Application ID and Javascript key (see image below).

<img src="https://i.imgur.com/ww6ZPSk.png" />

In [parse-demo-api/config.js](https://github.com/codepath/parse-web-demo/blob/main/parse-demo-api/config.js#L1-L2), set PARSE_APP_ID and PARSE_JAVASCRIPT_KEY.

To run the Express app, clone the repo, and run the following commands:

```
cd parse-demo-api
npm install
npm start
```

In a new Terminal window, run the React app by running the following commands:

```
cd parse-demo-ui
npm install
npm run dev
```

Visit http://localhost:3000, and try registering a user and posting a message.

## Implementation Overview

### User Authentication

The Parse integration is in the Express app, which implements 4 routes: POST /login, POST /register, GET /messages, POST /messages. The routes are implemented in [parse-web-demo/index.js](https://github.com/codepath/parse-web-demo/blob/main/parse-demo-api/index.js).

Login and registration is fairly straightforward. Parse.User is a subclass of Parse.Object, which is a dictionary. You can add any custom key to the dictionary that you want. In the Parse dashboard, it will display any custom key that you add.

For example, in the /register route, note that the new user is created like this: `let user = new Parse.User(req.body)`. Any keys/values that you pass in req.body will be added to the newly created user.

### Creating Objects

Data in Parse is a Parse Object. In the Parse documentation, you can create a subclass of Parse Object for your model objects, but it's not required. You can also create a generic Parse Object, and specify the table in the instantiation. For example,

`const message = new Parse.Object("Messages", req.body)`

Similar to user registration, pass in req.body, and it will add all the keys/values in the request in the new Message object. If you add a new key/value, Parse will automatically add the new column in the backend.

The POST /messages route also demonstrates how to add a related Parse object. The React app adds a custom HTTP header called `custom_user_id` for the logged in user. Create a new Parse User and set the id. In the message, add the "user" key. You could have named the key anything, like "author" or "owner".

```
currentUserId = req.headers["current_user_id"]
const user = new Parse.User()
user.id = currentUserId

message.set("user", user)
```

### Querying Objects

One of Parse's best features is its powerful query syntax (powered by MongoDB under the hood). The code snippet below illustrates how to create a query of the Messages table.

The `include` feature below is important if your data contains references to objects in other tables. If you don't use `include`, the query will return an array of messages, where each message contains the id of the user, but not the full user object.

```
const query = new Parse.Query("Messages")

query.descending("createdAt")
query.include("user")

messages = await query.find()
```

See the full set of query options in the [Parse Query documentation](https://docs.parseplatform.org/js/guide/#basic-queries).