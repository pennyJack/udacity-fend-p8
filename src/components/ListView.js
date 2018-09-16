import React, { Component } from 'react'
import ListItem from './ListItem'
import './css/ListView.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class ListView extends Component {
  state = {
    query: ''
  }

  filter = (e) => {
    this.setState({
      query: e.target.value
    })
    this.props.filterSights(e.target.value)
  }

  render() {
    const {filteredSights, onListClick} = this.props
    const {query} = this.state

    return(
      <nav className="list-view">
        <div className="filter">
          <label htmlFor="searchbox">
            <FontAwesomeIcon icon={faSearch} />
          </label>
          <input
            id="searchbox"
            type="text"
            value={query}
            placeholder="Search by name"
            onChange={this.filter}
          />
        </div>
        <ul className="list" onClick={(e) => onListClick(filteredSights, e)}>
          {filteredSights.map((sight) => {
            return (
              <ListItem
                key={sight.venue.id}
                name={sight.venue.name}
              />
            )
          })}
          </ul>
      </nav>
    )
  }
}

export default ListView