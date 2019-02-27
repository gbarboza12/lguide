import React from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';
import styled from 'styled-components';

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

const PostModal = props => {
  const close = () => {
    props.handleCloseModal();
  };
  const post = props.post;

  return (
    <div>
      <div className="page-title-div text-center">
        <h1 className="post-title">{post.title}</h1>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <div className="text-right">
        <ul className="tag-list">
          {post.tags
            ? post.tags.map(tag => (
                <li key={tag}>
                  <StyledLink key={tag} to={`/tags/${_.kebabCase(tag)}`}>
                    {tag}
                  </StyledLink>
                </li>
              ))
            : null}
        </ul>
      </div>
      <div className="text-center">
        <button className="btn modal-btn" onClick={close}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PostModal;
