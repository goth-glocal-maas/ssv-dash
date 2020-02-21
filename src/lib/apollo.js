import { ApolloClient } from "apollo-client"
import { createUploadLink } from "apollo-upload-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { setContext } from "apollo-link-context"
import fetch from "isomorphic-unfetch"
import { getToken, getUserId, getRole } from "./auth"

const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  fetch
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getToken()
  // return the headers to the context so httpLink can read them
  if (!token) return headers
  // supported roles: user, mod // God has no power here!
  let h = {
    "X-Hasura-User-Id": getUserId(),
    "X-Hasura-Role": getRole()
  }
  if (token) {
    h["Authorization"] = `Bearer ${token}`
  }

  return {
    headers: {
      ...headers,
      ...h
    }
  }
})

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
export function createApolloClient(initialState = {}) {
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(uploadLink),
    cache: new InMemoryCache().restore(initialState),
    credentials: "include"
  })
}
