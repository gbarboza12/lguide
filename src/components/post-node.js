import React, { Component } from 'react'
import { Link } from 'gatsby'
import _ from 'lodash'
import styled from 'styled-components'

import './post.css'

const StyledLink = styled(Link)`
  background-color: #bdc3c7;
  color: #ec644b;
  padding: 1px 8px;
  display: inline-block;
  margin: 2px 3px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  font-size: 1rem;
  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
  &:hover {
    background-color: #000;
    color: #ec644b;
    text-decoration: none;
  }
`

export default class PostNode extends Component {
  render() {
    const { post } = this.props
    return (
      <div key={post.id} className="post-div">
        <div className="row">
          {post.image ? (
            <div className="col-3 col-sm-2 post-cover">
              <img src={post.image.childImageSharp.sizes.src} alt={post.title} />
            </div>
          ) : null}

          <div className="col-9 col-sm-10">
            <h2 className="post-title">{post.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </div>

        <div className="text-right">
          <ul className="tag-list">
            {post.tags
              ? post.tags.map(tag => (
                  <li>
                    <StyledLink key={tag} to={`/tags/${_.kebabCase(tag)}`}>
                      {tag}
                    </StyledLink>
                  </li>
                ))
              : null}
          </ul>
        </div>
        <hr className="post-divider" />
      </div>
    )
  }
}
