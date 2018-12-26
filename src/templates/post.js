import React, { Component } from 'react';
import { Link } from 'gatsby';
import _ from "lodash";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import "./post.css";

export default class Post extends Component {
  render() {
    const { post } = this.props;

    return (
      <div key={post.id} className="post-div">
        <h3>
          {post.title}
        </h3>
        <p dangerouslySetInnerHTML={{ __html: post.html }} />
        {post.tags ?
          post.tags.map(tag => (
            <div className="text-right">
              <Link
                key={tag}
                to={`/tags/${_.kebabCase(tag)}`}
              ><FontAwesomeIcon icon={faTag} />{tag}</Link>
            </div>
          )
          ) : null}

        <hr className="post-divider"></hr>
      </div>
    )
  }
}
