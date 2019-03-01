import React, { Component } from 'react';
import { Link } from 'gatsby';

import './styles/header.css';
import Search from './search';
import logo from '../images/logo.svg';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }
  toggleNavbar() {
    this.setState(
      {
        collapsed: !this.state.collapsed,
      },
      () => {
        this.props.hideContent(this.state.collapsed);
      }
    );
  }
  getLinks() {
    const links = [];
    const collapsed = this.state.collapsed;
    const divStyle = collapsed ? 'navbar-nav mr-auto' : 'overlay-content';
    const linkStyle = collapsed ? 'nav-link' : '';
    links.push(
      <li key="books">
        <Link
          className={linkStyle}
          activeClassName="activeLink"
          to={`/categories/books`}
        >
          Books
        </Link>
      </li>
    );
    links.push(
      <li key="films">
        <Link
          className={linkStyle}
          activeClassName="activeLink"
          to={`/categories/films`}
        >
          Films
        </Link>
      </li>
    );
    links.push(
      <li key="podcasts">
        <Link className={linkStyle} activeClassName="activeLink" to={`/`}>
          Podcasts
        </Link>
      </li>
    );
    return <ul className={`${divStyle}`}>{links}</ul>;
  }

  render() {
    return (
      <header aria-label="Site Header">
        {!this.state.collapsed ? (
          <div className="overlay">
            <button className="btn closebtn" onClick={this.toggleNavbar}>
              &times;
            </button>
            {this.getLinks()}
          </div>
        ) : (
          <nav
            className="navbar navbar-expand-sm app-header"
            id="navbar-brand"
            aria-label="Primary Menu"
          >
            <Link to="/">
              <img src={logo} className="logo" alt="logo" />
            </Link>
            <div className="collapse navbar-collapse" id="navlinks-div">
              {this.getLinks()}
            </div>
            <Search toggleNavbar={this.toggleNavbar} />
          </nav>
        )}
      </header>
    );
  }
}
