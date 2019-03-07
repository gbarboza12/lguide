import React from 'react';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTag,
  faPodcast,
  faBook,
  faFilm,
} from '@fortawesome/free-solid-svg-icons';

const SearchResults = props => {
  const { results } = props;
  const getIcon = category => {
    if (category === 'Books') {
      return <FontAwesomeIcon icon={faBook} />;
    } else if (category === 'Films') {
      return <FontAwesomeIcon icon={faFilm} />;
    } else if (category === 'Podcasts') {
      return <FontAwesomeIcon icon={faPodcast} />;
    } else {
      return <FontAwesomeIcon icon={faTag} />;
    }
  };

  return (
    <div className="search-results-div">
      <ul>
        {results.map(page => (
          <li>
            <Link to={page.slug}>
              <h5>{page.title}</h5>
              {page.category === 'Books' && page.author && (
                <p className="results-text">{`Author: ${page.author}`}</p>
              )}
              <p className="results-text">Topics: {page.tags.join(`, `)}</p>
              <p className="results-text">{getIcon(page.category)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
