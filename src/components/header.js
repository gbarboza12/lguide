import React, { Component } from 'react';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import './styles/header.css';
import Search from './search';

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
        <Link
          className={linkStyle}
          activeClassName="activeLink"
          to={`/`}
        >
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
            className="navbar navbar-expand-md app-header"
            id="navbar-brand"
            aria-label="Primary Menu"
          >
            <Link className="navbar-brand" to="/">
              Navbar
            </Link>
            <button
              className="navbar-toggler ml-auto hidden-sm-up float-xs-right"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={this.toggleNavbar}
            >
              <span className="navbar-toggler-icon">
                <FontAwesomeIcon icon={faBars} />
              </span>
            </button>

            <div className="collapse navbar-collapse" id="navlinks-div">
              {this.getLinks()}
            </div>
            <Search />
          </nav>
        )}
      </header>
    );
  }
}
