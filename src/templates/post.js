import React, { Component } from 'react';
import { Link } from 'gatsby';
import _ from "lodash";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import "./post.css";

export default class Post extends Component {
  render() {
    const { post } = this.props;

    return (
      <div key={post.id}>
        <h3>
          {post.title}
        </h3>
        <p dangerouslySetInnerHTML={{ __html: post.html }} />
        {post.tags && 
          post.tags.map(tag => (
            <Link
              key={tag}
              to={`/tags/${_.kebabCase(tag)}`}
              ><FontAwesomeIcon icon={faHashtag} />{tag}</Link>
          ))
        }
        <hr class="post-divider"></hr>
      </div>
    )
  }
}
