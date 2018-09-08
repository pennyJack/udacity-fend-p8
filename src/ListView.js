import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import ListItem from './ListItem'

class ListView extends Component {
  state = {
    query: '',
    filteredSights: []
  }

  filter = (e) => {
    this.setState({
      query: e.target.value
    })
  }

  render() {
    const {sights} = this.props
    const {query} = this.state

    let showingList
    if(query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingList = sights.map(sight => sight.venue.name).filter((name) =>
      match.test(name))
    } else {
      showingList = sights.map(sight => sight.venue.name)
      console.log(showingList)
    }

    //console.log(query)

    return(
      <nav className="listView">
        <h2 className="heading">Programm Kinos</h2>
        <label htmlFor="filter">Filter your results!</label>
        <input
          id="filter"
          type="text"
          value={query}
          placeholder="Filter theaters by name"
          onChange={this.filter}
          />
          <ul className="list">
            {showingList.map((name, index) => {
              return <ListItem
                key={index}
                name={name}
              />
            })}
          </ul>
      </nav>
    )
  }
}

export default ListView
