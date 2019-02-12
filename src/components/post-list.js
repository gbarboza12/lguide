import React, { Component } from 'react';

import PostNode from '../components/post-node';

export default class PostList extends Component {
  getPosts() {
    const tagFilterList = this.props.checkedTags; // null if page context is tags/topics
    const categoryFilterList = this.props.checkedCategories; //  null if page contact is categories
    const posts = [];
    this.props.postEdges.forEach(postEdge => {
      // if tag filters are set and category node does not contain specified tags, skip node
      if (
        tagFilterList &&
        tagFilterList.length > 0 &&
        !postEdge.node.frontmatter.tags.some(item =>
          tagFilterList.includes(item)
        )
      ) {
        return;
      }
      // if category filters are set and tag node does not belong in specified category,
      // skip node. NOTE: first letter of category is capitalized
      if (
        categoryFilterList &&
        categoryFilterList.length > 0 &&
        !categoryFilterList.includes(postEdge.node.frontmatter.category)
      ) {
        return;
      }
      posts.push({
        title: postEdge.node.frontmatter.title,
        category: postEdge.node.frontmatter.category,
        tags: postEdge.node.frontmatter.tags,
        html: postEdge.node.html,
        id: postEdge.node.id,
        image: postEdge.node.frontmatter.image,
      });
    });
    return posts;
  }

  render() {
    const posts = this.getPosts();
    return (
      <React.Fragment>
        {posts.map(post => (
          <PostNode key={post.title} post={post} />
        ))}
      </React.Fragment>
    );
  }
}
