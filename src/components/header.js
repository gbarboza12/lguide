import React from 'react'
import { Link } from 'gatsby'

const Header = ({ siteTitle }) => (
  <div className="app-header" >
    <nav className="navigation-bar">
      <div>
        <ul className="navigation__list">
          <li>
            <Link className="navigation__link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="navigation__link" to="/">
              Books
            </Link>
          </li>
          <li>
            <Link className="navigation__link" to="/">
              Articles
            </Link>
          </li>
          <li>
            <Link className="navigation__link" to="/">
              Film
            </Link>
          </li>
          <li>
            <Link className="navigation__link" to="/">
              Social Media
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
)

export default Header
