import React, { Component } from 'react'
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react'
import * as LocationAPI from './LocationAPI'
import './App.css'

export class App extends Component {
  state = {
    sights: [],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  }

  getSights = () => {
    LocationAPI.getLocation("Düsseldorf", "movie theater")
    .then(data => {
      this.setState({sights: data.response.groups[0].items})
      console.log(this.state.sights)
    })
  }

  onMarkerClick = (props, marker, e) => {
    //fix: if activeMarker is already open (visible), close activeMarker and
    //open InfoWindow from marker which is clicked on
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: !this.state.showingInfoWindow
    })
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {
    const style = {
      width: '100%',
      height: '100%'
    }
    console.log(this.state.selectedPlace, this.state.activeMarker)
    return (
      <Map
        google={this.props.google}
        onReady={this.getSights}
        onClick={this.onMapClicked}
        style={style}
        zoom={13}
        initialCenter={{
            lat: 51.227741,
            lng: 6.773456
          }}>
          {this.state.sights.map(sight => (
            <Marker
              key={sight.venue.id}
              title={sight.venue.name}
              address={sight.venue.location.address}
              position={{lat: sight.venue.location.lat, lng: sight.venue.location.lng}}
              onClick={this.onMarkerClick} />
          ))}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.title}</h1>
              <p>{this.state.selectedPlace.address}</p>
            </div>
          </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(App)
