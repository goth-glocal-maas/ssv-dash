import React from "react"
import { Helmet } from "react-helmet"
import { Switch, Route } from "react-router-dom"
import io from "socket.io-client"
import "./App.css"
import NavBar from "./component/NavBar"
import Container from "./component/Container"
import Login from "./page/Login"
import Page404 from "./page/Page404"
import Profile from "./page/Profile"
import Main from "./page/Main"

const socket = io(process.env.REACT_APP_PASSPORT_URI)

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Hailing App</title>
      </Helmet>

      <NavBar />
      <Container>
        <Switch>
          <Route
            exact
            path="/login"
            component={() => <Login socket={socket} />}
          />
          <Route exact path="/me" component={Profile} />
          <Route exact path="/" component={Main} />
          <Route path="*" component={Page404} />
        </Switch>
      </Container>
    </div>
  )
}

export default App
