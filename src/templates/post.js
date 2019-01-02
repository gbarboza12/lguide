import React, { Component } from 'react';
import { Link } from 'gatsby';
import { graphql } from "gatsby";
import _ from "lodash";
import styled from "styled-components"

import Layout from '../components/layout';

const StyledLink = styled(Link)`
  background-color: #bdc3c7;
  border-radius: 12px;
  color: #ec644b;
  padding: 3px 8px;
  text-align: center;
  display: inline-block;
  margin: 2px 3px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  &:hover {
    background-color: #6c7a89;
    text-decoration: none;
  }
`;

export default class Post extends Component {
  render() {
    const postNode = this.props.data.markdownRemark;
    const post = postNode.frontmatter;
    const { slug } = this.props.pageContext;

    return (
      <Layout>
        <div className="container-fluid main-container">
          <div className="main-content">
            <div key={post.id} className="post-div">
              <h3>
                {post.title}
              </h3>
              <p dangerouslySetInnerHTML={{ __html: postNode.html }} />
              <div className="text-right">
                <ul className="tag-list">
                  {post.tags ?
                    post.tags.map(tag => (
                      <li>
                        <StyledLink
                          key={tag}
                          to={`/tags/${_.kebabCase(tag)}`}
                        >

                          {tag}

                        </StyledLink>
                      </li>
                    )) : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
export const pageQuery = graphql`
  query PostPage($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } } 
    ) {
        html
        id
        frontmatter {
          title
          category
          tags
        }
      }
  }
`;