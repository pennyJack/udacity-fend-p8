import React from 'react'
import './css/GoogleMap.css'
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react'

const GoogleMap = props => {

  const {google, filteredSights, showingInfoWindow, activeMarker, selectedPlace, getSights, onMarkerClick, onMapClicked} = props
  const style = {
    width: '100%',
    height: '100%'
  }

  //Error handling in case maps doesn't load (google = null)
  if (!google) {
    return (
      <div className="error-container">
        <h2 className="error-msg">Failed to load map! Try to refresh page.</h2>
      </div>
    )
  } else {
    return (
      <Map
        google={google}
        onReady={getSights}
        onClick={onMapClicked}
        style={style}
        zoom={13}
        initialCenter={{
            lat: 51.227741,
            lng: 6.773456
        }}>
        {filteredSights.map(sight => (
          <Marker
            key={sight.venue.id}
            id={sight.venue.id}
            title={sight.venue.name}
            address={sight.venue.location.address}
            position={{lat: sight.venue.location.lat, lng: sight.venue.location.lng}}
            animation={activeMarker ? (sight.venue.id === activeMarker.id ? 1 : 0) : 0}
            onClick={onMarkerClick} />
        ))}
        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}>
          <div>
              <h1>{selectedPlace.title}</h1>
              <p>{selectedPlace.address}</p>
            </div>
          </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(GoogleMap)
