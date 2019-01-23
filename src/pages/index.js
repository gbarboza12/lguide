import React, { Component } from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import _ from 'lodash'
import Search from '../components/search'
import Layout from '../components/layout'

export default class IndexPage extends Component {
  getTags() {
    const tags = []
    this.props.data.allMarkdownRemark.group.forEach(tag => {
      tags.push({
        tagName:
          tag.fieldValue.charAt(0).toUpperCase() + tag.fieldValue.slice(1),
        count: tag.totalCount,
      })
    })
    return tags
  }

  render() {
    const tagsList = this.getTags()
    return (
      <Layout>
        <div className="container-fluid main-container">
          <div className="main-content row justify-content-center align-items-center h-100">
            <div class="col col-sm-6 col-md-6 ">
              <Search searchData={this.props.data.siteSearchIndex.index} />
              <div className="topics-content">
                <h3>Topics</h3>
                {tagsList.map(tag => (
                  <span>
                    <Link
                      key={tag.tagName}
                      to={`/tags/${_.kebabCase(tag.tagName)}`}
                    >
                      {tag.tagName}({tag.count})
                    </Link>{' '}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
  query {
    siteSearchIndex {
      index
    }
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
