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
      checkedItems: [],
    }
    this.toggleSidebar = this.toggleSidebar.bind(this)
    this.updateCheckedItems = this.updateCheckedItems.bind(this)
  }
  toggleSidebar() {
    this.setState({
      showSidebar: !this.state.showSidebar,
    })
  }
  updateCheckedItems(item) {
    console.log("received " + item)
    const tempList = this.state.checkedItems
    // delete item if already in list
    if (tempList.includes(item)) {
      this.setState({
        checkedItems: tempList.filter(function(listItem) {
          return listItem !== item
        }),
      })
    } 
    //add item to list
    else {
      this.setState(prevState => ({
        checkedItems: [...prevState.checkedItems, item],
      }))
    }
  }
  render() {
    const { category } = this.props.pageContext
    const postEdges = this.props.data.categories.edges
    const filterItems = this.props.data.filters.group
    return (
      <Layout>
        <div className="container-fluid main-container">
          <button
            className=""
            type="button"
            aria-label="Toggle filter panel"
            onClick={this.toggleSidebar}
          >
            <span className="">
              <FontAwesomeIcon icon={faFilter} /> Filter by Topics
            </span>
          </button>
          {this.state.showSidebar ? (
            <Sidebar
              pageType={'category'}
              pageContext={category}
              close={this.toggleSidebar}
              update={this.updateCheckedItems}
              filterItems={filterItems}
            />
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
    categories: allMarkdownRemark(
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
    filters: allMarkdownRemark(
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
