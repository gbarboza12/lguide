import React from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';
import _ from 'lodash';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTag,
  faPodcast,
  faBook,
  faFilm,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

const StyledLink = styled(Link)`
  font-size: 0.8rem;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  @media screen and (max-width: 576px) {
    font-size: 0.7rem;
  }
  &:link,
  &:visited,
  &:active {
    text-decoration: none;
    color: #0c3b6d;
  }
  &:hover {
    text-decoration: none;
  }
`;
const RecentPosts = ({ data, screenSize }) => {
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
  const getList = () => {
    return (
      <ul>
        {data.map(post => (
          <li key={post.node.frontmatter.title}>
            <Link
              className="recent-post-title"
              to={`/${post.node.fields.slug}`}
            >
              {post.node.frontmatter.title}
            </Link>
            <div>
              <StyledLink
                key={post.node.frontmatter.category}
                to={`/categories/${_.kebabCase(
                  post.node.frontmatter.category
                )}`}
              >
                {getIcon(post.node.frontmatter.category)}{' '}
                {post.node.frontmatter.category}
              </StyledLink>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      {screenSize === 'large' ? (
        <div className="recent-side-content col-lg-3 ">
          <h2 className="text-center">Recent Additions</h2>
          {getList()}
          <div className="text-right">
            <Link to="/recent">
              More <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="recent-expanded-content">
          <h1 className="text-center">Recent Additions</h1>
          {getList()}
          <div className="text-center">
            <Link className="more-link" to="/recent">
              See More <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          limit: 5
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          totalCount
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                category
              }
            }
          }
        }
      }
    `}
    render={data => (
      <RecentPosts data={data.allMarkdownRemark.edges} {...props} />
    )}
  />
);
