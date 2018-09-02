import React, { Component } from 'react'
import { GoogleApiWrapper } from 'google-maps-react'
import MapComponent from './MapComponent'
import './App.css'

class App extends Component {
  render() {

    return (
      <MapComponent google={this.props.google} />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(App)
