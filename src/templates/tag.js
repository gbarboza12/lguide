import React from 'react';
import { graphql } from "gatsby";

import Layout from '../components/layout';
import PostList from '../components/post-list';

export default class Tag extends React.Component {
  render() {
    const { tag } = this.props.pageContext;
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
  query TagPage($tag: String) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$tag] } } }
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