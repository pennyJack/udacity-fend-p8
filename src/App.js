import React, { Component } from 'react'
import GoogleMap from './GoogleMap'
import ListView from './ListView'
import * as LocationAPI from './LocationAPI'
import './App.css'

class App extends Component {
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
    return (
      <main id="mainContent">
        <ListView
          sights={this.state.sights}
        />
        <div className="googleMap">
        <GoogleMap
          sights={this.state.sights}
          showingInfoWindow={this.state.showingInfoWindow}
          activeMarker={this.state.activeMarker}
          selectedPlace={this.state.selectedPlace}
          getSights={this.getSights}
          onMarkerClick={this.onMarkerClick}
          onMapClicked={this.onMapClicked} />
        </div>
      </main>
    )
  }
}

export default App
