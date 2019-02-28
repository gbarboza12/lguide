import React, { Component } from 'react';
import { Link } from 'gatsby';
import { graphql } from 'gatsby';
import _ from 'lodash';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import Layout from '../components/layout';

const StyledLink = styled(Link)`
  background-color: transparent
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
  &:link, &:visited, &:active {
    text-decoration: none;
    color: #d32f2f;
    border: 2px solid #d32f2f !important;
  }
  &:hover {
    background-color: #d32f2f;
    color: #fff;
    text-decoration: none;
  }
`;

export default class Post extends Component {
  render() {
    const postNode = this.props.data.markdownRemark;
    const post = postNode.frontmatter;

    return (
      <Layout>
        <main id="main-content" aria-label="Main Content">
          <div className="container-fluid main-container">
            <div className="main-content row justify-content-center align-items-center h-100">
              <div key={post.id} className="post-div col col-sm-8 col-md-8">
                <div className="bottom-padding">
                  <h1 className="post-title">{post.title}</h1>
                  {post.website && (
                    <div className="website-div">
                      <a
                        href={post.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Website <FontAwesomeIcon icon={faExternalLinkAlt} />
                      </a>
                    </div>
                  )}
                </div>

                <div className="row">
                  {post.image && (
                    <div className="col-3 col-sm-3 col-md-4 col-lg-3 post-cover">
                      {post.website ? (
                        <a
                          href={post.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={post.image.childImageSharp.sizes.src}
                            alt=""
                          />
                        </a>
                      ) : (
                        <img
                          src={post.image.childImageSharp.sizes.src}
                          alt=""
                        />
                      )}
                    </div>
                  )}
                  <div className="col-9 col-sm-9 col-md-8 col-lg-9">
                    <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
                  </div>
                </div>

                <div className="text-right">
                  <ul className="tag-list">
                    {post.tags &&
                      post.tags.map(tag => (
                        <li>
                          <StyledLink
                            key={tag}
                            to={`/tags/${_.kebabCase(tag)}`}
                          >
                            {tag}
                          </StyledLink>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
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
        website
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
