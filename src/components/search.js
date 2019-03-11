import React, { Component } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { Index } from 'elasticlunr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import SearchResults from './search-results';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ``,
      results: [],
      showResults: false,
      searchFormCSS: 'd-flex',
      inputCSS: 'form-control',
    };
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSearchButton = this.handleSearchButton.bind(this);
    this.handleCloseButton = this.handleCloseButton.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }
  // clicking inside search does nothing, clicking outside prompts search results div to close
  handleClick = e => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.setState({ showResults: false });
  };
  handleFocus() {
    this.setState({
      showResults: true,
      searchFormCSS: 'd-flex active',
      inputCSS: 'form-control input-active',
    });
  }
  handleBlur() {
    this.setState({
      searchFormCSS: 'd-flex',
      inputCSS: 'form-control',
    });
  }
  handleSearchButton(e) {
    e.preventDefault();
    this.setState({
      searchFormCSS: 'd-flex active',
      inputCSS: 'form-control input-active',
    });
  }
  handleCloseButton(e) {
    e.preventDefault();
    this.setState({
      searchFormCSS: 'd-flex',
      inputCSS: 'form-control',
      showResults: false,
    });
  }
  toggleNavbar() {
    this.props.toggleNavbar();
  }
  showResultsDiv() {
    const showResults = this.state.showResults;
    const results = this.state.results;
    if (results.length === 0) {
      return false;
    } else if (results.length > 0 && showResults) {
      return true;
    } else {
      return false;
    }
  }
  getOrCreateIndex = () =>
    this.index ? this.index : Index.load(this.props.searchData);

  search = evt => {
    const query = evt.target.value;
    this.index = this.getOrCreateIndex();
    this.setState({
      showResults: true,
      query,
      results: this.index
        .search(query, { expand: true }) // Accept partial matches
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    });
  };

  render() {
    const showResultsDiv = this.showResultsDiv();
    const { results, searchFormCSS, inputCSS } = this.state;

    return (
      <div className="search-div" ref={node => (this.node = node)}>
        <form className={searchFormCSS} role="search">
          <div className="input-group">
            <input
              type="text"
              autoComplete="off"
              className={inputCSS}
              placeholder="Search"
              onChange={this.search}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            {!showResultsDiv && (
              <div className="input-group-append">
                <button
                  type="reset"
                  className="btn btn-search"
                  onClick={this.handleCloseButton}
                >
                  <FontAwesomeIcon icon={faTimes} />
                  <span className="sr-only">Close</span>
                </button>
              </div>
            )}

            <div className="input-group-append">
              <button
                type="submit"
                className="btn btn-search"
                onClick={this.handleSearchButton}
              >
                <FontAwesomeIcon icon={faSearch} />
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>

        <div className="hamburger-div">
          <button
            className="btn btn-hamburger"
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
        </div>

        {showResultsDiv && <SearchResults results={results} />}
      </div>
    );
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        siteSearchIndex {
          index
        }
      }
    `}
    render={data => (
      <Search searchData={data.siteSearchIndex.index} {...props} />
    )}
  />
);
