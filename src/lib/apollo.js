import { split } from "apollo-link"
import { ApolloClient } from "apollo-client"
import { WebSocketLink } from "apollo-link-ws"
import { createUploadLink } from "apollo-upload-client"
import { getMainDefinition } from "apollo-utilities"
import { InMemoryCache } from "apollo-cache-inmemory"
import { setContext } from "apollo-link-context"
import fetch from "isomorphic-unfetch"
import { getToken, getUserId, getRole } from "./auth"

const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  fetch
})

// Create a WebSocket link:
const wsLink = (extraHeaders = {}) => {
  return new WebSocketLink({
    uri: process.env.REACT_APP_WEBSOCKET_LINK,
    options: {
      reconnect: true,
      connectionParams: () => {
        const jwt_token = getToken()
        const uid = getUserId()
        const role = getRole()
        return {
          headers: {
            Authorization: jwt_token ? `Bearer ${jwt_token}` : ""
          }
        }
      }
    }
  })
}

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getToken()
  // return the headers to the context so httpLink can read them
  if (!token) return headers
  // supported roles: user, mod // God has no power here!
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
      "X-Hasura-User-Id": getUserId(),
      "X-Hasura-Role": getRole()
    }
  }
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  wsLink(),
  uploadLink
)

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
export function createApolloClient(initialState = {}) {
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(link),
    cache: new InMemoryCache().restore(initialState),
    credentials: "include"
  })
}
