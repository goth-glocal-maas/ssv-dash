import React from "react"
import { Helmet } from "react-helmet"
import { Switch, Route } from "react-router-dom"
import io from "socket.io-client"
import "./App.css"
import BottomBar from "./component/BottomBar"
import Container from "./component/Container"
import Login from "./page/Login"
import Page404 from "./page/Page404"
import Profile from "./page/Profile"

const socket = io(process.env.REACT_APP_PASSPORT_URI)

const Blank = () => (
  <>
    <h1>What is Lorem Ipsum?</h1>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
  </>
)

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Batsu</title>
      </Helmet>

      <BottomBar />
      <Container>
        <Switch>
          <Route
            exact
            path="/login"
            component={() => <Login socket={socket} />}
          />
          <Route exact path="/me" component={Profile} />
          <Route exact path="/" component={Blank} />
          <Route path="*" component={Page404} />
        </Switch>
      </Container>
    </div>
  )
}

export default App
