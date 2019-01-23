import React, { Component } from 'react'
import { Link } from 'gatsby'
import _ from 'lodash'

export default class TopicsList extends Component {
  render() {
    const topicsList = this.props.topicsList
    return (
      <div className="topics-content">
        <h1>Topics</h1>
        <div className="topics-list-div">
        {topicsList.map(tag => (
          <span>
            <Link key={tag.tagName} to={`/tags/${_.kebabCase(tag.tagName)}`}>
              {tag.tagName}({tag.count})
            </Link>{' '}
          </span>
        ))}
        </div>
      </div>
    )
  }
}
