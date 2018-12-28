import React from 'react'
import { Link } from 'gatsby'

const Header = ({ data }) => (
  <div className="app-header" >
    <nav className="navigation-bar">
      <div id="nav-div">
        <ul className="navigation__list">
          <li>
            <Link className="navigation__link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link
              className="navigation__link"
              to={`/categories/books`}
            >
              Books
            </Link>
          </li>
          <li>
            <Link className="navigation__link" to="/">
              Articles
            </Link>
          </li>
          <li>
            <Link
              className="navigation__link"
              to={`/categories/films`}>
              Films
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
