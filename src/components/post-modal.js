import React from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';
import styled from 'styled-components';
import ShowMore from 'react-show-more';

const StyledLink = styled(Link)`
  background-color: transparent;
  padding: 1px 8px;
  display: inline-block;
  margin: 2px 3px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  font-size: 1rem;
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
  @media screen and (max-width: 768px) {
    font-size: 0.7rem;
    padding: 1px 4px;
    &:link,
    &:visited,
    &:active {
      border: 1px solid #d32f2f !important;
    }
  }
`;

const PostModal = props => {
  const close = () => {
    props.handleCloseModal();
  };
  const post = props.post;

  return (
    <div id="modal">
      <button
        type="button"
        aria-label="Close"
        className="btn modal-closebtn"
        onClick={close}
      >
        &times;
      </button>

      <h2 className="post-title">{post.title}</h2>
      {post.category === 'Books' && post.author && (
        <div className="author-div">
          <b>Author:</b> {post.author}
        </div>
      )}
      {post.website && (
        <div className="website-div bottom-padding">
          <a href={post.website} target="_blank" rel="noopener noreferrer">
            Website
          </a>
        </div>
      )}
      <div className="modal-post-content">
        <ShowMore lines={8} more="Show more" less="Show less" anchorClass="">
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </ShowMore>
      </div>
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
    </div>
  );
};

export default PostModal;
