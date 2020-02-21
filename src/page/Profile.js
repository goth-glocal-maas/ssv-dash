import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import Basic from "../lib/basic"
import { Center } from "../component/parts"

const USER_QUERY = gql`
  query PROFILE_QUERY($id: String!) {
    users(where: { id: $id }) {
      first_name
      last_name
      dob
      last_login
    }
  }
`

const Profile = () => {
  const { isLoggedIn, basic, signout } = Basic.useContainer()
  const { client } = useQuery(USER_QUERY, {
    variables: { id: "" },
    skip: !isLoggedIn
  })
  return (
    <Center>
      <Helmet>
        <title>Your profile</title>
      </Helmet>
      <p>{basic.username}</p>
      <Link className="App-link" to="/">
        Home
      </Link>
      {isLoggedIn && (
        <button
          className="button is-small is-danger"
          onClick={() => {
            signout(client)
          }}
        >
          Log out
        </button>
      )}
    </Center>
  )
}
export default Profile
