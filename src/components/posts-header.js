import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSlidersH,
  faGripHorizontal,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

export default class PostsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleListMode = this.toggleListMode.bind(this);
  }
  toggleSidebar() {
    this.props.toggleSidebar();
  }
  toggleListMode(value) {
    this.props.toggleListMode(value);
  }
  render() {
    const {listMode, pageTitle} = this.props;
    const listBtnCSS = listMode ? 'btn display-btn display-btn-active' : 'btn display-btn';
    const coversBtnCSS = listMode ? 'btn display-btn' : 'btn display-btn display-btn-active'
    return (
      <div>
        <div className="filterbtn-div row">
          <div className="col-4 col-sm-6">
            <button
              className="btn filter-btn"
              type="button"
              aria-label="Filter category by topics"
              onClick={this.toggleSidebar}
            >
              <FontAwesomeIcon icon={faSlidersH} /> Filter
            </button>
          </div>
          <div className="col-8 col-sm-6 float-right">
            <span className="float-right">
              <button
                className={listBtnCSS}
                type="button"
                aria-label="display list"
                onClick={() => this.toggleListMode(true)}
              >
                <FontAwesomeIcon icon={faBars} /> List
              </button>
              {'  '}
              <button
                className={coversBtnCSS}
                type="button"
                aria-label="display covers"
                onClick={() => this.toggleListMode(false)}
              >
                <FontAwesomeIcon icon={faGripHorizontal} /> Covers
              </button>
            </span>
          </div>
        </div>
        <div className="text-center page-title-div post-list-title-div">
          <h1>{pageTitle}</h1>
        </div>
      </div>
    );
  }
}
