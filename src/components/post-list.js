import React, { Component } from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const StyledLink = styled(Link)`
  background-color: transparent;
  padding: 1px 8px;
  display: inline-block;
  margin: 2px 3px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  font-size: 1rem;
  @media screen and (max-width: 768px) {
    font-size: 0.7rem;
    padding: 1px 5px;
  }
  &:link,
  &:visited,
  &:active {
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

export default class PostList extends Component {
  render() {
    const { post } = this.props;
    return (
      <div key={post.id} className="post-div col-xl-10 m-auto">
        <div className="row">
          {post.image && (
            <div className="col-3 col-sm-2 col-md-3 col-lg-3 post-cover">
              {post.website ? (
                <a
                  href={post.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={post.image.childImageSharp.sizes.src} alt="" />
                </a>
              ) : (
                <img src={post.image.childImageSharp.sizes.src} alt="" />
              )}
            </div>
          )}

          <div className="col-9 col-sm-10 col-md-9 col-lg-9 my-auto">
            <h2 className="post-title">{post.title}</h2>
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
        </div>

        <div
          className="post-description-div"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <div className="text-right">
          <ul className="tag-list">
            {post.tags &&
              post.tags.map(tag => (
                <li key={tag}>
                  <StyledLink key={tag} to={`/tags/${_.kebabCase(tag)}`}>
                    {tag}
                  </StyledLink>
                </li>
              ))}
          </ul>
        </div>
        <hr className="post-divider" />
      </div>
    );
  }
}
