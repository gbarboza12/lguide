import React, { Component } from 'react';
import _ from 'lodash';


export default class PostCover extends Component {
  constructor(props) {
    super(props);
  }
  handleOpenModal(post) {
    this.props.handleOpenModal(post);
  }
  render() {
    const { post } = this.props;
    return (
      <li key={post.id} className="post-cover-node">
        {post.image ? (
          <div className="container" onClick={() => this.handleOpenModal(post)}>
            <img
              src={post.image.childImageSharp.sizes.src}
              alt=""
            />
            <div className="post-cover-overlay">
              <div className="post-cover-text ">
                {post.title}
                <p className="post-cover-description">Read description...</p>
              </div>
            </div>
          </div>
        ) : null}
      </li>
    );
  }
}