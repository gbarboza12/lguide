import React, { Component } from 'react'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
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
    links.push(<Link className="nav-link" to="/">Home</Link>);
    links.push(<Link className="nav-link" to={`/categories/books`}>Books</Link>);
    links.push(<Link className="nav-link" to={`/categories/films`}>Films</Link>);
    links.push(<Link className="nav-link" to={`/`}>Podcasts</Link>);
    const listItems = links.map((link) =>
      <li className="nav-item ">{link}</li>
    );
    return (
    <ul className="navbar-nav mr-auto">{listItems}I</ul>
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
            <a href="javascript:void(0)" className="closebtn" onclick={this.toggleNavbar()}>&times;</a>
            {this.getLinks()} 
          </div>
            : null}
        </nav>
      </div>
    );
  }
}

export default Header
