import React, { Component } from 'react';
import { Link } from 'gatsby';
import _ from "lodash";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Search from './search';

import Layout from '../components/layout';

export default class IndexPage extends Component {
  getTags() {
    const tags = [];
    this.props.data.allMarkdownRemark.group.forEach(tag => {
      tags.push({
        tagName: tag.fieldValue.charAt(0).toUpperCase() + tag.fieldValue.slice(1),
        count: tag.totalCount
      });
    });
    return tags;
  }

  render() {
    const tagsList = this.getTags();
    return (
      <Layout>
        <div className="container-fluid main-container">
          <div className="form-group search-content">
            {/* <input type="search" className="form-control" id="search" placeholder="Search" />
            <span className="icon"><FontAwesomeIcon icon={faSearch} /></span> */}
            <Search />
          </div>
          <div className="topics-content">
            <h3>Topics</h3>
            {
              tagsList.map(tag => (
                <Link
                  key={tag.tagName}
                  to={`/tags/${_.kebabCase(tag.tagName)}`}
                > {tag.tagName}({tag.count})
              </Link>
              ))
            }
            <br />
          </div>
        </div>

      </Layout>
    )
  }
}


export const query = graphql`
  query {
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
