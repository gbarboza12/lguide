import React, { Component } from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';
import styled from 'styled-components';
import ShowMore from 'react-show-more';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Responsive from 'react-responsive';

const StyledLink = styled(Link)`
  background-color: transparent;
  padding: 1px 8px;
  display: inline-block;
  margin: 2px 3px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  font-size: 1rem;
  &:link,
  &:visited,
  &:active {
    text-decoration: none;
    color: #d32f2f;
    border: 2px solid #d32f2f !important;
  }
  &:hover {
    background-color: #d32f2f;
    color: #fff;
    text-decoration: none;
  }
  @media screen and (max-width: 768px) {
    font-size: 0.7rem;
    padding: 1px 4px;
    &:link,
    &:visited,
    &:active {
      border: 1px solid #d32f2f !important;
    }
  }
`;

export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagsCSS: 'tags-li',
      expandTags: false,
    };
    this.tagsExpand = this.tagsExpand.bind(this);
    this.tagsCollapse = this.tagsCollapse.bind(this);
  }
  tagsExpand() {
    this.setState({ tagsCSS: 'tags-li-expand', expandTags: true });
  }
  tagsCollapse() {
    this.setState({ tagsCSS: 'tags-li', expandTags: false });
  }
  render() {
    const { post } = this.props;
    const { tagsCSS, expandTags } = this.state;
    const Mobile = props => <Responsive {...props} maxWidth={575} />;
    const Default = props => <Responsive {...props} minWidth={576} />;

    return (
      <div key={post.id} className="post-div col-xl-10 m-auto">
        <div className="row">
          {post.image && (
            <div className="col-3 col-sm-2 col-md-3 col-lg-3 post-cover">
              {post.website ? (
                <a
                  href={post.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={post.image.childImageSharp.sizes.src} alt="" />
                </a>
              ) : (
                <img src={post.image.childImageSharp.sizes.src} alt="" />
              )}
            </div>
          )}

          <div className="col-9 col-sm-10 col-md-9 col-lg-9 my-auto">
            <h2 className="post-title">{post.title}</h2>
            {post.category === 'Books' && post.author && (
              <div className="author-div">
                <b>Author:</b> {post.author}
              </div>
            )}
            {post.website && (
              <div className="website-div">
                <a
                  href={post.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
              </div>
            )}
            <div className="post-description-div">
              <ShowMore
                lines={4}
                more="Show more"
                less="Show less"
                anchorClass=""
              >
                <div
                  className="post-description-div"
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />
              </ShowMore>
            </div>
          </div>
        </div>
        <Default>
          <div className="text-right">
            <ul className="tag-list">
              {post.tags &&
                post.tags.map(tag => (
                  <li key={tag}>
                    <StyledLink key={tag} to={`/tags/${_.kebabCase(tag)}`}>
                      {tag}
                    </StyledLink>
                  </li>
                ))}
            </ul>
          </div>
        </Default>
        <Mobile>
          {post.tags && (
            <div className="text-right">
              <ul className="tag-list">
                {post.tags.map(tag => (
                  <li key={tag} className={tagsCSS}>
                    <StyledLink key={tag} to={`/tags/${_.kebabCase(tag)}`}>
                      {tag}
                    </StyledLink>
                  </li>
                ))}
                {!expandTags && post.tags.length > 3 && (
                  <button className="btn tagsbtn" onClick={this.tagsExpand}>
                    More <FontAwesomeIcon icon={faPlus} />
                  </button>
                )}
                {expandTags && post.tags.length > 3 && (
                  <button className="btn tagsbtn" onClick={this.tagsCollapse}>
                    Less <FontAwesomeIcon icon={faMinus} />
                  </button>
                )}
              </ul>
            </div>
          )}
        </Mobile>
        <hr className="post-divider" />
      </div>
    );
  }
}
