import React from 'react'
import { graphql } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

import Layout from '../components/layout'
import PostList from '../components/post-list'
import Sidebar from '../components/sidebar'

export default class Tag extends React.Component {
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
    const { tag } = this.props.pageContext
    const postEdges = this.props.data.tags.edges
    const filterOptions = this.props.data.filters.group
    const checkedItems = this.state.checkedItems
    const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1)
    return (
      <Layout>
        <div className="container-fluid main-container">
          <div className="filterbtn-div">
            <button
              className="btn btn-outline-danger"
              type="button"
              aria-label="Filter topics by category"
              onClick={this.toggleSidebar}
            >
              <FontAwesomeIcon icon={faFilter} /> Filter
            </button>
          </div>
          <div className="main-content">
            <div className="text-center page-title-div">
              <h1>Topic: {formattedTag}</h1>
            </div>
            <PostList postEdges={postEdges} checkedCategories={checkedItems} />
          </div>
          {this.state.showSidebar ? (
            <Sidebar
              filterType={'Category'}
              close={this.toggleSidebar}
              update={this.updateCheckedItems}
              filterOptions={filterOptions}
            />
          ) : null}
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query TagPage($tag: String) {
    tags: allMarkdownRemark(filter: { frontmatter: { tags: { in: [$tag] } } }) {
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
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`
