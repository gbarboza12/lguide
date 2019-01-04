import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

import Layout from '../components/layout'
import PostList from '../components/post-list'
import Sidebar from '../components/sidebar'

export default class Category extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSidebar: false,
    }
    this.toggleSidebar = this.toggleSidebar.bind(this)
  }
  toggleSidebar() {
    this.setState({
      showSidebar: !this.state.showSidebar,
    })
  }
  render() {
    const { category } = this.props.pageContext
    const postEdges = this.props.data.allMarkdownRemark.edges

    return (
      <Layout>
        <div className="container-fluid main-container">
          <button
            className=""
            type="button"
            // data-toggle="collapse"
            // data-target="#navbarNav"
            // aria-controls="navbarNav"
            // aria-expanded="false"
            aria-label="Toggle filter panel"
            onClick={this.toggleSidebar}
          >
            <span className="">
              <FontAwesomeIcon icon={faFilter} /> Filter by Topics
            </span>
          </button>
          {this.state.showSidebar ? (
            <Sidebar pageType={'category'} pageContext={category} close={this.toggleSidebar} />
          ) : null}

          <div className="main-content">
            <PostList postEdges={postEdges} />
          </div>
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          html
          id
          frontmatter {
            title
            category
            tags
          }
        }
      }
    }
  }
`
