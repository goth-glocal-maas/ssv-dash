import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom"
import fetch from "isomorphic-unfetch"
import styled from "styled-components"
import { PROVIDERS } from "../lib/constant"
import Basic from "../lib/basic"
import OAuth from "../component/OAuth"

// this is for regular login
// currently not in use since everyday-passport move toward social login

const Box = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
`

const Login = ({ socket }) => {
  const basic = Basic.useContainer()
  const { signin } = basic
  let history = useHistory()
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    error: ""
  })
  const { handleSubmit, register, errors } = useForm()
  const onSubmit = async values => {
    const { email, password } = values
    const url = `${process.env.REACT_APP_PASSPORT_URI}/login`

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      if (response.status === 200) {
        const { id, email, token, roles } = await response.json()
        // await login({ id, email, token, roles })
        await signin({ id, email, token, roles })
        history.push("/")
      } else {
        console.error("Login failed.")
        // https://github.com/developit/unfetch#caveats
        const resp = await response.json()
        let error = new Error(response.statusText)
        if (resp.error) {
          error.message = resp.error
        } else if (resp.errors) {
          error.message = resp.errors
            .map(v => `${v["location"]}: ${v["msg"]}`)
            .join(",\n")
        }
        throw error
      }
    } catch (error) {
      /* console.error(
        "You have an error in your code or there are Network issues.",
        error
      ) */
      const { response } = error
      console.log(error)
      console.log(response)
      setUserData(
        Object.assign({}, userData, {
          error: response ? response.statusText : error.message
        })
      )
    }
  }

  return (
    <>
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-card auth-card">
          <div className="tabs-wrapper">
            {/* <div className="tabs">
              <ul>
                <li className="is-active" data-tab="login-tab">
                  <a>Login</a>
                </li>
                <li data-tab="register-tab">
                  <a>Register</a>
                </li>
              </ul>
            </div> */}
            <div id="login-tab" className="tab-content is-active">
              <div className="field">
                <label>Username</label>
                <div className="control">
                  <input
                    type="text"
                    className="input is-medium"
                    placeholder="Enter username"
                    name="email"
                    ref={register({
                      required: "Required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "invalid email address"
                      }
                    })}
                  />
                </div>
                {errors.email && errors.email.message}
              </div>
              <div className="field">
                <label>Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input is-medium"
                    placeholder="Enter password"
                    name="password"
                    ref={register({
                      required: "Required",
                      validate: value => value !== "admin" || "Nice try!"
                    })}
                  />
                </div>
                {errors.password && errors.password.message}
              </div>
            </div>
          </div>
        </div>

        {userData.error && <p className="error">Error: {userData.error}</p>}
        <button
          type="submit"
          className="button is-fullwidth secondary-btn is-rounded raised"
        >
          Login
        </button>
      </form>
    </>
  )
}

export default Login
