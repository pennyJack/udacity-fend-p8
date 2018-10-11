import React, { Component } from 'react'
import Header from './Header'
import GoogleMap from './GoogleMap'
import ListView from './ListView'
import * as LocationAPI from './LocationAPI'
import './css/App.css'
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

  componentDidMount() {
    window.gm_authFailure = this.gm_authFailure
    this.getSights()
    setTimeout(() => {
      if (!document.querySelector('.gm-style')) {
        const mapContainer = document.querySelector('.google-map')
        const mapErrorMsg = mapContainer.firstChild
        mapErrorMsg.className = 'error-container'
        mapErrorMsg.innerHTML = (
          "<h2 class='error-msg'>Couldn't load Google Maps! Try refreshing the page!</h2>"
        )
      }
    }, 2000)
  }

  gm_authFailure() {
    window.alert("Seems like there is a problem with authentication: for more info check the Chrome console by pressing ctrl+shift+j and follow the link!")
  }

  getSights = () => {
    LocationAPI.getLocation()
    .then(data => {
      this.setState({
        sights: data.response.groups[0].items.sort(sortBy('venue.name'))
      })
      this.setState({
        filteredSights: data.response.groups[0].items.sort(sortBy('venue.name'))
      })
    })
    .catch(err => {
      const listView = document.querySelector('.list-view')
      const errorMsg = document.createElement('div')
      errorMsg.className = 'error-container'
      errorMsg.innerHTML = (
        `<h3>Failed to fetch places!</h3>
         <p class="error-msg">${err}</p>`
      )
      listView.appendChild(errorMsg)
    })
  }

  filterSights = (query) => {
    if(query) {
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
    this.setState({
      selectedPlace: props,
      activeMarker: this.state.activeMarker ? null : marker,
      showingInfoWindow: !this.state.showingInfoWindow
    })
  }

  onListClick = (props, e) => {
    if (e.charCode === 13 || e.type === "click") {
      let desktopMarker = document.querySelectorAll('.gmnoprint map area')
      let mobileMarker = document.querySelectorAll('.gmnoprint')
      let marker = desktopMarker[0] ? desktopMarker : mobileMarker

      marker = [...marker].filter(marker => {
        return marker.title === e.target.innerHTML
      })
      marker.forEach(marker => marker.click())
    }
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
      <div>
        <Header />
        <main id="main-content">
          <ListView
            filteredSights={this.state.filteredSights}
            filterSights={this.filterSights}
            onListClick={this.onListClick}
          />
          <div className="google-map" role="application" aria-label="Google Maps">
            <GoogleMap
              filteredSights={this.state.filteredSights}
              showingInfoWindow={this.state.showingInfoWindow}
              activeMarker={this.state.activeMarker}
              selectedPlace={this.state.selectedPlace}
              getSights={this.getSights}
              onMarkerClick={this.onMarkerClick}
              onMapClicked={this.onMapClicked}
            />
          </div>
        </main>
      </div>
    )
  }
}

export default App
