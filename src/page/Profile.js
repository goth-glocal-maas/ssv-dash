import React from "react"
import { Helmet } from "react-helmet"
import { Redirect } from "react-router-dom"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import Basic from "../lib/basic"
import { getUserId, getUsername } from "../lib/auth"
import { Center, Loading } from "../component/parts"
import { version, versionDate } from "../../package.json"

const USER_QUERY = gql`
  query PROFILE_QUERY($id: Int!) {
    users: auth_user(where: { id: { _eq: $id } }) {
      first_name
      last_name
      username
      email
      profile_url
      last_login
    }
  }
`

const Profile = () => {
  const { isLoggedIn, signout } = Basic.useContainer()
  const { client, data, loading } = useQuery(USER_QUERY, {
    variables: { id: getUserId() },
    skip: !isLoggedIn
  })

  if (!isLoggedIn) return <Redirect to="/" />
  if (loading) return <Loading />
  const { users } = data
  const user = users[0]

  return (
    <Center>
      <Helmet>
        <title>Your profile</title>
      </Helmet>

      {user.profile_url && (
        <div>
          <figure className="image is-128x128">
            <img
              alt="profile"
              className="is-rounded"
              src={`${user.profile_url}`}
            />
          </figure>
        </div>
      )}
      <p>{getUsername()}</p>
      <br />
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

      <small className="muted">
        v{version}-{versionDate}
      </small>
    </Center>
  )
}
export default Profile
