import React, { Component } from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'
import * as LocationAPI from './LocationAPI'
import './App.css'

export class App extends Component {
  state = {
    places: []
  }

  getPlaces = () => {
    LocationAPI.getLocation("Düsseldorf", "movie theater")
    .then(data => {
      this.setState({places: data.response.groups[0].items})
      console.log(this.state.places)
    })
  }

  render() {
    const style = {
      width: '100%',
      height: '100%'
    }
    return (
      <Map
        google={this.props.google}
        onReady={this.getPlaces}
        style={style}
        zoom={13}
        initialCenter={{
            lat: 51.227741,
            lng: 6.773456
          }}>
          <Marker
            title={'Some marker.'}
            name={'Marker'}
            position={{lat: 51.227741, lng: 6.773456}} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(App)
