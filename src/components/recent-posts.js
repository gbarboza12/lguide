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
} from '@fortawesome/free-solid-svg-icons';
import Responsive from 'react-responsive';

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
const RecentPosts = ({ data }) => {
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
  const Desktop = props => <Responsive {...props} minWidth={992} />;
  const Default = props => <Responsive {...props} maxWidth={991} />;
  return (
    <div className="recent-side-content col-lg-3 ">
      <Desktop>
        <h2 className="text-center">Latest Additions</h2>
      </Desktop>
      <Default>
        <h1 className="text-center top-padding">Latest Additions</h1>
      </Default>

      <ul>
        {data.map(post => (
          <li key={post.node.frontmatter.title}>
            <Link to={`/${post.node.fields.slug}`}>
              {post.node.frontmatter.title}
            </Link>
            <div className="">
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
      <Desktop>
        <div className="text-right">
          <Link to="">More...</Link>
        </div>
      </Desktop>
      <Default>
      <div className="text-center">
          <h3><Link to="">See More...</Link></h3>
        </div>
      </Default>
    </div>
  );
};

export default () => (
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
    render={data => <RecentPosts data={data.allMarkdownRemark.edges} />}
  />
);
