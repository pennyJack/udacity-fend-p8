import React from 'react'
import './css/Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Header = props => {
  /* Does it matter if I use a variable instead of state here?
  I only use the variable for a specific purpose and don't pass it to another
  component. --> The function probably has to be put in a parent component:
  https://reactjs.org/docs/faq-styling.html */
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
