import React, { Component } from 'react'
import GoogleMap from './GoogleMap'
import ListView from './ListView'
import * as LocationAPI from './LocationAPI'
import './App.css'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class App extends Component {
  state = {
    sights: [],
    filteredSights: [],
    showingInfoWindow: false,
    activeMarker: null,
    selectedPlace: {}
  }

  getSights = () => {
    LocationAPI.getLocation("Düsseldorf", "pizza")
    .then(data => {
      this.setState({
        sights: data.response.groups[0].items.sort(sortBy('venue.name'))
      })
      this.setState({
        filteredSights: data.response.groups[0].items.sort(sortBy('venue.name'))
      })
      console.log(this.state.sights)
    })
  }

  filterSights = (query) => {
    if(query) {
      console.log(query)
      const match = new RegExp(escapeRegExp(query), 'i')
      this.setState(state => ({
        filteredSights: state.sights
        .filter((sight) => match.test(sight.venue.name))
      }))
    } else {
      this.setState(state => ({
        filteredSights: state.sights
      }))
    }
  }

  onMarkerClick = (props, marker, e) => {
    //fix: if activeMarker is already open (visible), close activeMarker and
    //open InfoWindow from marker which is clicked on
    this.setState({
      selectedPlace: props,
      activeMarker: this.state.activeMarker ? null : marker,
      showingInfoWindow: !this.state.showingInfoWindow
    })
  }

  onListClick = (props, e) => {
    //fix: when switching to Samsung Galaxy S5 device mode, selecting
    //markers by clicking on the List doesn't work properly
    let marker = document.querySelectorAll('.gmnoprint map area')
    marker = [...marker].filter(marker => {
      return marker.title === e.target.innerHTML
    })
    marker.forEach(marker => marker.click())
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
          filteredSights={this.state.filteredSights}
          filterSights={this.filterSights}
          onListClick={this.onListClick}
        />
        <div className="googleMap">
        <GoogleMap
          filteredSights={this.state.filteredSights}
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
