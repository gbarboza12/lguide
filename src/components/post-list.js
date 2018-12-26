import React, { Component } from 'react';
import { Link } from 'gatsby';

import Post from '../templates/post';

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
      <div className="">
        {posts.map(post => (
          <Post post={post} />
        ))}
        <Link to="/">Go back to the homepage</Link>
      </div>
    )
  }
}


// export const query = graphql`
// query {
//   allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
//     totalCount
//     edges {
//       node {
//         id
//         frontmatter {
//           title
//           date(formatString: "DD MMMM, YYYY")
//           category
//           tags
//         }
//         excerpt
//         html
//       }
//     }
//   }
// }
//   `