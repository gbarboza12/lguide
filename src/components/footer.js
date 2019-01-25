import React from 'react'
import { Link } from 'gatsby'

const Footer = () => {
  return (
    <footer className="footer">
      <ul>
        <li>
          <Link to={`/about`}>About</Link>
        </li>
        <li>
          <Link to={`/contact`}>Contact</Link>
        </li>
        <li>
          <Link to={`/credits`}>Credits</Link>
        </li>
      </ul>
    </footer>
  )
}
export default Footer
