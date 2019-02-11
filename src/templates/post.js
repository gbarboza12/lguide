import React, { Component } from 'react';
import { Link } from 'gatsby';
import { graphql } from 'gatsby';
import _ from 'lodash';
import styled from 'styled-components';

import Layout from '../components/layout';

const StyledLink = styled(Link)`
  background-color: #bdc3c7;
  color: #d1381c;
  padding: 1px 8px;
  text-align: center;
  display: inline-block;
  margin: 2px 3px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  font-size: 1.2rem;
  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
  &:link {
    text-decoration: none;
  }
  &:hover {
    background-color: #404142;
    color: #ec644b;
    text-decoration: none;
  }
`;

export default class Post extends Component {
  render() {
    const postNode = this.props.data.markdownRemark;
    const post = postNode.frontmatter;

    return (
      <Layout>
        <div className="container-fluid main-container">
        <main id="main-content" aria-label="Main Content">
          <div className="main-content row justify-content-center align-items-center h-100">
            <div key={post.id} className="post-div col col-sm-6 col-md-6 ">
              <div className="page-title-div text-center">
                <h1 className="post-title">{post.title}</h1>
              </div>

              <div className="row">
                {post.image ? (
                  <div className="col-3 col-sm-2 post-cover">
                    <img
                      src={post.image.childImageSharp.sizes.src}
                      alt={post.title}
                    />
                  </div>
                ) : null}
                <div className="col-9 col-sm-10">
                  <p dangerouslySetInnerHTML={{ __html: postNode.html }} />
                </div>
              </div>

              <div className="text-right">
                <ul className="tag-list">
                  {post.tags
                    ? post.tags.map(tag => (
                        <li>
                          <StyledLink
                            key={tag}
                            to={`/tags/${_.kebabCase(tag)}`}
                          >
                            {tag}
                          </StyledLink>
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            </div>
          </div>
          </main>
        </div>
      </Layout>
    );
  }
}
export const pageQuery = graphql`
  query PostPage($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      id
      frontmatter {
        title
        category
        tags
        image {
          childImageSharp {
            sizes(maxWidth: 500) {
              src
            }
          }
        }
      }
    }
  }
`;
