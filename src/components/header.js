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
    console.log();
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
    links.push(
      <Link key="books" activeClassName="activeLink" to={`/categories/books`}>
        Books
      </Link>
    );
    links.push(
      <Link key="films" activeClassName="activeLink" to={`/categories/films`}>
        Films
      </Link>
    );
    links.push(
      <Link key="podcasts" activeClassName="activeLink" to={`/`}>
        Podcasts
      </Link>
    );
    return <div className={`${divStyle}`}>{links}</div>;
  }
  render() {
    return (
      <header>
        {!this.state.collapsed ? (
          <div className="overlay">
            <a
              href="javascript:void(0)"
              className="closebtn"
              onClick={this.toggleNavbar}
            >
              &times;
            </a>
            {this.getLinks()}
          </div>
        ) : (
          <nav className="navbar navbar-expand-sm app-header" id="navbar-brand">
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
