import React from "react"
import { Helmet } from "react-helmet"
import { Switch, Route } from "react-router-dom"
import "./App.css"
import NavBar from "./component/NavBar"
import Container from "./component/Container"
import LoginFetch from "./page/LoginFetch"
import Page404 from "./page/Page404"
import Profile from "./page/Profile"
import Main from "./page/Main"

// const socket = io(process.env.REACT_APP_PASSPORT_URI)

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>SSV DASH</title>
      </Helmet>

      <NavBar />
      <Container>
        <Switch>
          <Route
            exact
            path="/login"
            component={() => <LoginFetch />}
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
