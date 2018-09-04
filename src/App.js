import React, { Component } from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'
import * as LocationAPI from './LocationAPI'
import './App.css'

export class App extends Component {
  state = {
    sights: []
  }

  getSights = () => {
    LocationAPI.getLocation("Düsseldorf", "movie theater")
    .then(data => {
      this.setState({sights: data.response.groups[0].items})
      console.log(this.state.sights)
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
        onReady={this.getSights}
        style={style}
        zoom={13}
        initialCenter={{
            lat: 51.227741,
            lng: 6.773456
          }}>
          {this.state.sights.map(sight => (
            <Marker
              key={sight.venue.id}
              title={'Some marker.'}
              name={'Marker'}
              position={{lat: sight.venue.location.lat, lng: sight.venue.location.lng}} />
          ))}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(App)
