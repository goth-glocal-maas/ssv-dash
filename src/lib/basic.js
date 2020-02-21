import { useState } from "react"
import { createContainer } from "unstated-next"
import cookie from "js-cookie"
import { login, logout } from "./auth"

export const authInitState = {
  token: cookie.get("token") || null,
  uid: cookie.get("id") || null,
  roles: cookie.get("roles") || [],
  username: cookie.get("username") || null
}

function useBasic(initialState = authInitState) {
  let [basic, setBasic] = useState(initialState)
  let signin = async ({ id, username, token, roles }) => {
    await login({ id, username, token, roles })
    setBasic({ uid: id, token, username, roles })
  }
  let signout = async client => {
    setBasic({ token: null })
    await logout()
    if (client) client.resetStore()
  }
  let isLoggedIn = basic.token !== null
  return { basic, isLoggedIn, signin, signout }
}

let Basic = createContainer(useBasic)
export default Basic
