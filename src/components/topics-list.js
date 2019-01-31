import React from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';

const TopicsList = ({ topicsList }) => {
  return (
    <div className="topics-content">
      <h1>Browse Topics</h1>
      <div className="topics-list-div">
        {topicsList.map(tag => (
          <span key={tag.tagName}>
            <Link key={tag.tagName} to={`/tags/${_.kebabCase(tag.tagName)}`}>
              {tag.tagName}({tag.count})
            </Link>{' '}
          </span>
        ))}
      </div>
    </div>
  );
};
export default TopicsList;
