import React, { Component } from 'react';
import { Link } from "gatsby";
import { Index } from 'elasticlunr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ``,
      results: []
    };
  }
  getOrCreateIndex = () =>
    this.index
      ? this.index
      :
      Index.load(this.props.searchData);

  search = evt => {
    const query = evt.target.value;
    this.index = this.getOrCreateIndex();
    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(query, { expand: true }) // Accept partial matches
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref))
    });
  };

  render() {
    return (
      <div>
        <div className="form-group search-content">
          <input
            type="text"
            id="search"
            className="form-control"
            value={this.state.query}
            placeholder="Search"
            onChange={this.search}
          />
          <span className="icon"><FontAwesomeIcon icon={faSearch} /></span>
        </div>
        <ul>
          {this.state.results.map(page => (
            <li key={page.id}>
              <Link to={page.slug}>{page.title}</Link>
              {": " + page.tags.join(`,`)}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}