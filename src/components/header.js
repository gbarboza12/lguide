import React, { Component } from 'react'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  getLinks() {
    const links = [];
    const collapsed = this.state.collapsed;
    const linkStyle = collapsed ? 'nav-item nav-link' : 'overlay-link';
    const divStyle = collapsed ? 'navbar-nav mr-auto' : "overlay-content"
    links.push(<Link className={`${linkStyle}`} to="/">Home</Link>);
    links.push(<Link className={`${linkStyle}`} to={`/categories/books`}>Books</Link>);
    links.push(<Link className={`${linkStyle}`} to={`/categories/films`}>Films</Link>);
    links.push(<Link className={`${linkStyle}`} to={`/`}>Podcasts</Link>);
    return (
      <div className={`${divStyle}`}>{links}</div>
    );
  }
  render() {
    return (
      <div className="app-header" >
        <nav className="navigation-bar navbar navbar-expand-sm">
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
            <span className="navbar-toggler-icon"><FontAwesomeIcon icon={faBars} /></span>
          </button>
          <div className="collapse navbar-collapse" id="nav-div">
            {this.getLinks()}
          </div>
          {!this.state.collapsed ?
            <div className="overlay">
              {console.log("div overlay")}
              <a href="javascript:void(0)" className="closebtn" onClick={this.toggleNavbar}>&times;</a>
              {this.getLinks()}
            </div>
            : null}
        </nav>
      </div>
    );
  }
}