import React from 'react'
import './css/Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Header = props => {
  //does it matter if I use a variable instead of state here?
  let visible = true

  const toggleListView = () => {
    const listView = document.querySelector('.list-view')
    const googleMap = document.querySelector('.google-map')
    console.log(listView, googleMap)
    if (visible) {
      visible = false
      listView.classList.add('non-visible')
      googleMap.classList.add('full-width')
    } else {
      visible = true
      listView.classList.remove('non-visible')
      googleMap.classList.remove('full-width')
    }
  }

  return (
    <header className="page-header">
      <div className="hamburger">
        <FontAwesomeIcon icon={faBars} size="2x" onClick={toggleListView} />
      </div>
      <h1 className="heading">20 best Pizza places in Düsseldorf!</h1>
    </header>
  )
}

export default Header
