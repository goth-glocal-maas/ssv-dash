import React from "react"
import styled from "styled-components"
import Map from "../component/Map"
import QueueList from "../component/QueueList"

const PageBox = styled.div`
  display: flex;
  flex-direction: row;

  height: 100%;
`

const SidePane = styled.div`
  width: 350px;
`

const MapPane = styled.div`
  flex: 1;
`

export default function Main() {
  return (
    <PageBox>
      <SidePane>
        <h1>Reservation List</h1>
        <QueueList />
      </SidePane>

      <MapPane>
        <Map />
      </MapPane>
    </PageBox>
  )
}
