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
      searchFormCSS: 'search-form search-form-focus',
    });
  }
  handleBlur() {
    this.setState({
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
      <div className="col-md-3 search-div" ref={node => (this.node = node)}>
        <form className="">
          <label className={searchFormCSS} for="inpt_search">
            <input
              id="search"
              type="search"
              autoComplete="off"
              name="search"
              aria-label="search"
              onChange={this.search}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
          </label>
          {/* <div className="input-group input-wrapper">
            <input
              id="search"
              type="search"
              autoComplete="off"
              className="form-control input-search"
              name="search"
              placeholder="Search"
              aria-label="search"
              onChange={this.search}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            <FontAwesomeIcon icon={faSearch} />
          </div> */}
        </form>
        {showResultsDiv ? (
          <div className="search-results-div">
            <ul>
              {resultsList.map(page => (
                <li>
                  <Link to={page.slug}>
                    <h5>{page.title}</h5>
                    <p className="results-text">Category: {page.category}</p>
                    <p className="results-text">
                      Related topics: {page.tags.join(`, `)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
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
