import React, { Component } from 'react';
import { Link } from 'gatsby';
import _ from "lodash";
import styled from "styled-components"

import "./post.css";

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

export default class PostNode extends Component {
  render() {
    const { post } = this.props;
    return (
      <div key={post.id} className="post-div">
        <h3>
          {post.title}
        </h3>
        <p dangerouslySetInnerHTML={{ __html: post.html }} />
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
        <hr className="post-divider"></hr>
      </div>
    )
  }
}