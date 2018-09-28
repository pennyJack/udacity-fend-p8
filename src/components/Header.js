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

  const toggleListView = (e) => {
    /*Why is the event logged twice to the console when I press 'Enter' or
    'Space' using a button native html element? -> Implemented div as button*/
    if (e.charCode === 32 || e.charCode === 13 || e.type === "click") {
      const listView = document.querySelector('.list-view')
      const googleMap = document.querySelector('.google-map')
      const button = document.querySelector('.hamburger')
      if (visible) {
        visible = false
        listView.classList.add('non-visible')
        googleMap.classList.add('full-width')
        button.setAttribute('aria-expanded', 'false')
      } else {
        visible = true
        listView.classList.remove('non-visible')
        googleMap.classList.remove('full-width')
        button.setAttribute('aria-expanded', 'true')
      }
    }
  }

  return (
    <header className="page-header">
      <div
        aria-label="toggle list"
        aria-expanded="true"
        className="hamburger"
        onClick={toggleListView}
        onKeyPress={toggleListView}
        role="button"
        tabIndex={0}
      >
        <FontAwesomeIcon icon={faBars} size="2x" />
      </div>
      <h1 className="heading">20 best Pizza places in Düsseldorf!</h1>
    </header>
  )
}

export default Header
