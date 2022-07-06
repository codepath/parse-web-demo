# Parse Web Demo

This is a demo of a React and Express app that uses Parse as the backend. The app demonstrates the following use cases:

1. User login and registration
2. Adding data to a table
3. Querying a table
4. Persisting a logged in user

This app is a simple message board. You can login or register a new user. Once you're logged in, it displays a list of messages. You can post your own message, which will be added to the page.

<img src="https://i.imgur.com/2l6nR6A.gif" />

You can tinker with the deployed app here: [[https://codepath-parse-web-demo.surge.sh/]]. Quotes will be visible to everyone, so please add a quote you like!

## Running Locally

The repo contains an Express app that routes for logging in, creating a user, getting messages, and creating a new message. Before you can run the Express, you have to set up a Parse server.

To set up a Parse server, go to [[https://back4app.com]]. On the Back4App dashboard, click on your app, then App Settings->Security & Keys, and note the Application ID and Javascript key (see image below).

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
