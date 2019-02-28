import React, { Component } from 'react';

export default class PostCover extends Component {
  handleOpenModal(post) {
    this.props.handleOpenModal(post);
  }
  render() {
    const { post } = this.props;
    return (
      <li key={post.id} className="post-cover-node">
        <div>
          {post.image && (
            <div
              className="container"
              onClick={() => this.handleOpenModal(post)}
            >
              <img src={post.image.childImageSharp.sizes.src} alt="" />
              <div className="post-cover-overlay">
                <div className="post-cover-text ">
                  {post.title}
                  <p className="post-cover-description">Read description...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </li>
    );
  }
}
