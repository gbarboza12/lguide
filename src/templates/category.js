import React from 'react'
import { Link } from 'gatsby'
import { graphql } from "gatsby"

import Layout from '../components/layout'
import PostList from '../components/post-list'

export default class Category extends React.Component {
    render() {
      const { category } = this.props.pageContext;
      const postEdges = this.props.data.allMarkdownRemark.edges;

      return (
        <Layout>
          <div className="container-fluid content">
            <PostList postEdges={postEdges} />
          </div>
        </Layout>
      )
    }
}

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          html
          frontmatter {
            title
            category
            tags
          }
        }
      }
    }
  }
`;