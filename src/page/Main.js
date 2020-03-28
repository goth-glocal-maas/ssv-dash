import React from 'react'
import styled from 'styled-components'
import Map from '../component/Map'

const PageBox = styled.div`
  display: flex;
  flex-direction: row;

  height: 100%;
`

const SidePane = styled.div`
  width: 200px;
`

const MapPane = styled.div`
  flex: 1;
`

export default function Main() {


  return (
    <PageBox>
      <SidePane>
        <h1>Reservation List</h1>
      </SidePane>

      <MapPane>
        <Map />
      </MapPane>
    </PageBox>
  )

}