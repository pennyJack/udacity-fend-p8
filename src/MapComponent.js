import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class MapComponent extends Component {

  componentDidMount() {
    this.loadMap();
  }

  loadMap() {
  if (this.props && this.props.google) {
    // google is available
    const {google} = this.props;
    const maps = google.maps;

    const mapRef = this.refs.map;
    const node = ReactDOM.findDOMNode(mapRef);

    const mapConfig = Object.assign({}, {
      center: {lat: 51.227741, lng: 6.773456},
      zoom: 13
    })
    this.map = new maps.Map(node, mapConfig);
  }
}

  renderChildren() {

  }

  render() {

    return (
      <div ref='map' className='map' role='application' aria-label='Map'>
        Loading map...
        {this.renderChildren()}
      </div>
    )
  }
}

export default MapComponent
