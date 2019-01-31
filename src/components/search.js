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
    };
  }
  getOrCreateIndex = () =>
    this.index ? this.index : Index.load(this.props.searchData);

  search = evt => {
    const query = evt.target.value;
    this.index = this.getOrCreateIndex();
    this.setState({
      query,
      results: this.index
        .search(query, { expand: true }) // Accept partial matches
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    });
  };

  render() {
    return (
      <div className="col-md-2">
        <form className="search-form">
          <div className="form-group">
            <input
              id="search"
              type="search"
              autoComplete="off"
              className="form-control"
              name="search"
              placeholder="Search"
              onChange={this.search}
            />
            <span className="glyphicon glyphicon-search form-control-feedback">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </div>
          </form>
        {this.state.results.length > 0 ? (
          <div className="search-results-div ">
            <ul>
              {this.state.results.map(page => (
                <li key={page.id}>
                  <Link to={page.slug}>{page.title}</Link>
                 
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
