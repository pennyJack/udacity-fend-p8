import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Header = props => {
  let visible = true

  const toggleListView = () => {
    const listView = document.querySelector('.list-view')
    const googleMap = document.querySelector('.google-map')
    if (visible) {
      visible = false
      listView.classList.add('non-visible')
      googleMap.classList.add('full-width')
    } else {
      visible = true
      listView.classList.remove('non-visible')
      googleMap.classList.remove('full-width')
    }
    console.log(listView)
  }

  return (
    <header className="page-header">
      <FontAwesomeIcon icon={faBars} size="2x" onClick={toggleListView} />
      <h1 className="heading">20 best Pizza places in Düsseldorf!</h1>
    </header>
  )
}

export default Header
