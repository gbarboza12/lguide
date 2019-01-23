import React, { Component } from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import _ from 'lodash'

import Search from '../components/search'
import Layout from '../components/layout'
import TopicsList from '../components/topics-list'

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
    const topicsList = this.getTags()
    return (
      <Layout>
        <div class="jumbotron jumbotron-fluid">
          <div class="container hero-text">
            <h1 >Fluid jumbotron</h1>
            <p>
              This is a modified jumbotron that occupies the entire horizontal
              space of its parent.
            </p>
          </div>
        </div>
        <div className="container-fluid main-container index-container">
          <div className="main-content row justify-content-center align-items-center h-100">
            <div class="col col-sm-6 col-md-6 ">
              <Search searchData={this.props.data.siteSearchIndex.index} />
              <TopicsList topicsList={topicsList} />
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
