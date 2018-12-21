import React from 'react'
import { Link } from 'gatsby'
import { graphql } from "gatsby"

import Layout from './layout'

const PostList = ({ data }) => {
  return (
    <Layout>
      <div className="container-fluid content">
      {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <h3>
              {node.frontmatter.title}
            </h3>
            <p dangerouslySetInnerHTML={{ __html: node.html }} />
          </div>
        ))}
      <Link to="/">Go back to the homepage</Link>
      </div>
    </Layout>
  )
}

export default PostList

export const query = graphql`
query {
  allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
    totalCount
    edges {
      node {
        id
        frontmatter {
          title
          date(formatString: "DD MMMM, YYYY")
          category
          tags
        }
        excerpt
        html
      }
    }
  }
}
  `