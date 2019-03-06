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

import Layout from '../components/layout';

const StyledLink = styled(Link)`
  font-size: 1rem;
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

const Recent = ({ data, pageContext }) => {
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
  const NavLink = props => {
    if (!props.test) {
      return <Link to={props.url} className="recent-page-link">{props.text}</Link>;
    } else {
      return <span className="recent-page-link">{props.text}</span>;
    }
  };

  const { group, index, pageCount } = pageContext;
  const first = index === 1 ? true : false;
  const last = index === pageCount ? true : false;
  const previousUrl =
    index - 1 === 1 ? 'recent/' : 'recent/' + (index - 1).toString();
  const nextUrl = 'recent/' + (index + 1).toString();

  return (
    <Layout>
      <main id="main-content" aria-label="Main Content">
        <div className="container-fluid main-container">
          <div className="main-content row justify-content-center align-items-center h-100">
            <div className="col col-sm-8 col-md-8 recent-page-content">
              <div className="page-title-div text-center">
                <h1>Recent Additions</h1>
              </div>
              <div className="page-text-div">
                <ul>
                  {group.map(post => (
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
              </div>
              <div className="row">
                <div className="col-4">
                  <NavLink
                    test={first}
                    url={previousUrl}
                    text="‹ Previous"
                  />
                </div>
                <div className="col-4 text-center">
                  <span className="recent-page-link">{`Page ${index} of ${pageCount}`} </span>
                </div>
                <div className="col-4 text-right">
                  <NavLink
                    test={last}
                    url={nextUrl}
                    text="Next ›"
                    
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};
export default props => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          limit: 15
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
    render={data => <Recent data={data.allMarkdownRemark.edges} {...props} />}
  />
);
