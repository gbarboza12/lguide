import React, { Component } from 'react'
import { graphql } from 'gatsby'
import './sidebar.css'

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.close = this.close.bind(this);
  }
  close() {
    this.props.close();
  }
  render() {
    const { pageType, pageContext } = this.props
    return (
      <div className="sidebar">
        <a
          href="javascript:void(0)"
          className="closebtn"
          onClick={this.close}
        >
          &times;
        </a>
        {`Filter ${pageContext}`}
      </div>
    )
  }
}
