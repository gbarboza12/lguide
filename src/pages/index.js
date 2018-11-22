import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const IndexPage = () => (
  <Layout>
    <div className="container-fluid content">
      <div className="form-group search-content">
        <input type="search" class="form-control" id="search" placeholder="Search" />
        <span className="icon"><FontAwesomeIcon icon={faSearch} /></span>
      </div>
      <div className="topics-content">
        <h3>Topics</h3> 
        <br />
        <Link to="/page-2/">Go to page 2</Link>
      </div>
    </div>

  </Layout>
)

export default IndexPage
