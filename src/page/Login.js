import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import { PROVIDERS } from "../lib/constant"
import Basic from "../lib/basic"
import OAuth from "../component/OAuth"
import { Center } from "../component/parts"

const Box = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
`

const Login = ({ socket }) => {
  const basic = Basic.useContainer()
  const { isLoggedIn } = basic
  let history = useHistory()

  useEffect(() => {
    if (isLoggedIn) history.push("/")
  }, [isLoggedIn, history])

  return (
    <Center>
      <Box className="login-page">
        {PROVIDERS.map(provider => (
          <OAuth
            provider={provider}
            key={provider}
            socket={socket}
            basic={basic}
          />
        ))}
      </Box>
    </Center>
  )
}

export default Login
