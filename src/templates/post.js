import React, { Component } from 'react';
import { Link } from 'gatsby';
import { graphql } from "gatsby";
import _ from "lodash";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

import Layout from '../components/layout';


export default class Post extends Component {
  render() {
    const postNode = this.props.data.markdownRemark;
    const post = postNode.frontmatter;
    const { slug } = this.props.pageContext;

    return (
      <Layout>
        <div className="container-fluid main-container">
          <div className="main-content">
            <div key={post.id} className="post-div">
              <h3>
                {post.title}
              </h3>
              <p dangerouslySetInnerHTML={{ __html: postNode.html }} />
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
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
export const pageQuery = graphql`
  query PostPage($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } } 
    ) {
        html
        id
        frontmatter {
          title
          category
          tags
        }
      }
  }
`;