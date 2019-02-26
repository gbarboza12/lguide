import React from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';

const TopicsList = ({ topicsList }) => {
  return (
    <div className="topics-content col">
      <h1 className="page-title-div text-center">Browse Topics</h1>
      <div className="topics-list-div">
        <ul className="topics-list">
          {topicsList.map(tag => (
            <li key={tag.tagName}>
              <Link key={tag.tagName} to={`/tags/${_.kebabCase(tag.tagName)}`}>
                {tag.tagName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default TopicsList;
