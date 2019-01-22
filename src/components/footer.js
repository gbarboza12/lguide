import React, { Component } from 'react'
import { Link } from 'gatsby'

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <ul>
          <li>
            <Link to={`/`}>About</Link>
          </li>
          <li>
            <Link to={`/contact`}>Contact</Link>
          </li>
          <li>
            <Link to={`/`}>Contributors</Link>
          </li>
        </ul>
      </footer>
    )
  }
}
