import React, { Component } from 'react';
import { Link } from 'gatsby';

import PostNode from '../components/post-node';

export default class PostList extends Component {
  getPosts() {
    const posts = [];
    this.props.postEdges.forEach(postEdge => {
      posts.push({
        title: postEdge.node.frontmatter.title,
        category: postEdge.node.frontmatter.category,
        tags: postEdge.node.frontmatter.tags,
        html: postEdge.node.html,
        id: postEdge.node.id
      });
    });
    return posts;
  }

  render() {
    const posts = this.getPosts();
    return (
      <div>
        {posts.map(post => (
          <PostNode post={post} />
        ))}
        <Link to="/">Go back to the homepage</Link>
      </div>
    )
  }
}