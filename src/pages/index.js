import React, { Component } from 'react';
import { graphql } from 'gatsby';
import Responsive from 'react-responsive';

import Layout from '../components/layout';
import TopicsList from '../components/topics-list';
import RecentPosts from '../components/recent-posts';

export default class IndexPage extends Component {
  getTags() {
    const tags = [];
    this.props.data.allMarkdownRemark.group.forEach(tag => {
      tags.push({
        tagName:
          tag.fieldValue.charAt(0).toUpperCase() + tag.fieldValue.slice(1),
        count: tag.totalCount,
      });
    });
    return tags;
  }

  render() {
    const topicsList = this.getTags();
    const Small = props => <Responsive {...props} maxWidth={991} />;
    const Default = props => <Responsive {...props} minWidth={992} />;
    return (
      <Layout>
        <div className="hero-image">
          <div className="hero-text">
            <h1>Fluid jumbotron</h1>
            <p>
              This is a modified jumbotron that occupies the entire horizontal
              space of its parent.
            </p>
          </div>
        </div>
        <main id="main-content" aria-label="Main Content">
          <div className="container-fluid index-container">
            <div className="main-content index-content row ">
              <TopicsList topicsList={topicsList} />
              <Default>
                <RecentPosts screenSize={'large'} />
              </Default>
              <Small>
                <RecentPosts screenSize={'small'} />
              </Small>
            </div>
          </div>
        </main>
      </Layout>
    );
  }
}

export const query = graphql`
  query {
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
