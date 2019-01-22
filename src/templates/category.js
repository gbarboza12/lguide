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
    const filterOptions = this.props.data.filters.group
    const checkedItems = this.state.checkedItems.map(item => {
      return item.toLowerCase()
    })
    return (
      <Layout>
        <div className="container-fluid main-container h-100">
          <div className="filterbtn-div">
            <button
              className="btn btn-outline-danger"
              type="button"
              aria-label="Filter category by topics"
              onClick={this.toggleSidebar}
            >
              <FontAwesomeIcon icon={faFilter} /> Filter
            </button>
          </div>
          {this.state.showSidebar ? (
            <Sidebar
              filterType={'Topic'}
              close={this.toggleSidebar}
              update={this.updateCheckedItems}
              filterOptions={filterOptions}
            />
          ) : null}
          <div className="main-content">
            <div className="text-center page-title-div">
              <h1>{category}</h1>
            </div>
            <PostList postEdges={postEdges} checkedTags={checkedItems} />
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
            image {
              childImageSharp {
                sizes(maxWidth: 200) {
                  src
                }
              }
            }
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
