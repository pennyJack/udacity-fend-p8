import React from 'react'

const ListItem = props => {

  return(
    <li
      className="list-item"
      tabIndex={0}
      role="button"
    >{props.name}</li>
  )
}

export default ListItem
