import React from "react"
import { useSubscription } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { ListItem } from "./parts"
import { bkkTime } from "../lib/day"

const QUEUE_SUBSCRIPTION = gql`
  subscription QUEUE_SUBSCRIPTION {
    items: trip(where: { dropped_off_at: { _is_null: true } }) {
      place_from
      place_to
      user {
        username
      }
      is_advanced_reservation
      reserved_at
      picked_up_at
    }
  }
`
const Item = ({ value: { user, reserved_at } }) => (
  <ListItem>
    {user.username}
    <span>{bkkTime(reserved_at)}</span>
  </ListItem>
)

export default function QueueList() {
  const { data, loading, error } = useSubscription(QUEUE_SUBSCRIPTION, {
    shouldResubscribe: true
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  if (!data) return <p>No data</p>
  const { items } = data
  return (
    <>
      {items.map(item => (
        <Item key={`q-${item.id}`} value={item} />
      ))}
    </>
  )
}
