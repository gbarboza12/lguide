import React, { Component } from 'react';
import { graphql } from "gatsby";

import Layout from '../components/layout';
import PostList from '../components/post-list';

export default class Category extends Component {
  render() {
    const { category } = this.props.pageContext;
    const postEdges = this.props.data.allMarkdownRemark.edges;

    return (
      <Layout>
        <div className="container-fluid main-container">
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
`;