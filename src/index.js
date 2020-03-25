import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { ApolloProvider } from "@apollo/react-hooks"
import "./index.css"
import App from "./App"
import Basic from "./lib/basic"
import { createApolloClient } from "./lib/apollo"
import * as serviceWorker from "./serviceWorker"

/* const authUrl = `${AUTH_SERVER_URI}/webhook`
const reqOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${window.localStorage.token}`
  }
} */

const client = createApolloClient()

ReactDOM.render(
  <Basic.Provider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </Basic.Provider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
