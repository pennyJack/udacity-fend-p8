import React, { Component } from 'react'
import ListItem from './ListItem'

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
    const {filteredSights} = this.props
    const {query} = this.state

    return(
      <nav className="listView">
        <h2 className="heading">10 best Pizza places in town!</h2>
        <label htmlFor="filter">Filter your results!</label>
        <input
          id="filter"
          type="text"
          value={query}
          placeholder="Filter restaurants by name"
          onChange={this.filter}
          />
          <ul className="list">
            {filteredSights.map((sight, index) => {
              return <ListItem
                key={index}
                name={sight.venue.name}
              />
            })}
          </ul>
      </nav>
    )
  }
}

export default ListView
