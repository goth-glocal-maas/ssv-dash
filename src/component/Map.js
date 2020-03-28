import React, { useState } from "react"
import ReactMapGL, {
  // LinearInterpolator,
  FlyToInterpolator,
  SVGOverlay,
  CanvasOverlay,
  Popup
} from "react-map-gl"
import styled from "styled-components"

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 13.745993,
    longitude: 100.578080,
    zoom: 13,
    // transitionInterpolator: new LinearInterpolator({
    //   around: [event.offsetCenter.x, event.offsetCenter.y]
    // }),
    transitionDuration: 200
  })

  return (
    <MapContainer>
      {/* <MapControl moveToCurrentLoc={this._moveToCurrLocation} /> */}
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={vp => setViewport(vp)}
        reuseMaps={true}
        width="100%"
        height="100%"
        onClick={({ lngLat }) => {
          console.log(lngLat)
        }}
      >
        {/* <SVGOverlay redraw={this._redrawSVGOverlay} />
        <CanvasOverlay redraw={this._redrawCanvasOverlay} />
        {coords && (
          <MyLocationMarker
            lat={myLocation.latitude}
            lon={myLocation.longitude}
          />
        )} */}

        {/* {this._renderPopup()} */}
      </ReactMapGL>
    </MapContainer>
  )
}
