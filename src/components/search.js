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
      ? this.index : Index.load(this.props.searchData);

  search = evt => {
    const query = evt.target.value;
    this.index = this.getOrCreateIndex();
    this.setState({
      query,
      results: this.index
        .search(query, { expand: true }) // Accept partial matches
        .map(({ ref }) => this.index.documentStore.getDoc(ref))
    });
  };

  render() {
    return (
      
      <div className="search-content">
      
        <div className="input-group">
          <input
            type="search"
            id="search"
            className="form-control py-2 border-right-0"
            value={this.state.query}
            placeholder="Search"
            onChange={this.search}
          />
          <span className="input-group-append">
            <button id="search-icon " className="btn border-left-0" type="button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </span>
          
        </div>
        {
          this.state.results.length > 0 ?
            <ul>
              {this.state.results.map(page => (
                <li key={page.id}>
                  <Link to={page.slug}>{page.title}</Link>
                  {": " + page.tags.join(`,`)}
                </li>
              ))}
            </ul>
            : null
        }
      </div>
    );
  }
}