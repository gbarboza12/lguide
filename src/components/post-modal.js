import React from 'react';
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
      {post.website ? (
        <>
        <h2 className="post-title">{post.title}</h2>
        <div className="website-div">
          <a href={post.website} target="_blank" rel="noopener noreferrer">
            Website <FontAwesomeIcon icon={faExternalLinkAlt} />
          </a>
        </div>
        </>
      ) : <h2 className="bottom-padding">{post.title}</h2>}
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
