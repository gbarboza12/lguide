import React from 'react';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Layout from '../components/layout';

const IndexPage = () => (
  <Layout>
    <div className="container-fluid main-container">
      <div className="form-group search-content">
        <input type="search" class="form-control" id="search" placeholder="Search" />
        <span className="icon"><FontAwesomeIcon icon={faSearch} /></span>
      </div>
      <div className="topics-content">
        <h3>Topics</h3> 
        <br />
      </div>
    </div>

  </Layout>
)

export default IndexPage;
