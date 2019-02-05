import React, { Component } from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';
import { Index } from 'elasticlunr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ``,
      results: [],
      showResults: false,
      searchFormCSS: 'search-form',
    };
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }
  handleFocus() {
    this.setState({
      showResults: true,
      searchFormCSS: 'search-form.focus',
    });
  }
  handleBlur() {
    this.setState({
      // showResults: false,
      searchFormCSS: 'search-form',
    });
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
    const resultsList = this.state.results;
    const searchFormCSS = this.state.searchFormCSS;
    return (
      <div className="col-md-3 search-div">
        <form className={searchFormCSS}>
          <div className="input-group input-wrapper">
            <input
              id="search"
              type="search"
              autoComplete="off"
              className="form-control input-search"
              name="search"
              placeholder="Search"
              onChange={this.search}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            <span className="glyphicon glyphicon-search form-control-feedback">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </div>
        </form>
        {showResultsDiv ? (
          <div className="search-results-div" ref={node => (this.node = node)}>
            {resultsList.map(page => (
              <div className="search-results-item">
                <Link to={page.slug}>{page.title}</Link>
                <p className="topics-text">Category: {page.category}</p>
                <p className="topics-text">Related topics: {page.tags.join(`, `)}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query {
        siteSearchIndex {
          index
        }
      }
    `}
    render={data => <Search searchData={data.siteSearchIndex.index} />}
  />
);
