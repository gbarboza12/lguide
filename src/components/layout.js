import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet"
import 'bootstrap/dist/css/bootstrap.min.css';
import { TinyButton as ScrollUpButton } from 'react-scroll-up-button';

import Header from './header';
import Footer from './footer';
import './styles/layout.css';
import './styles/forms.css';
import './styles/search.css';
import './styles/post.css';
import './styles/post-cover.css';
import './styles/posts-header.css';
import './styles/sidebar.css';
import './styles/topics-list.css';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideContent: false,
    };
    this.hideContent = this.hideContent.bind(this);
  }
  hideContent(collapsed) {
    // if overlay is collapsed, don't hide content
    if (collapsed) {
      this.setState({
        hideContent: false,
      });
    } else {
      this.setState({
        hideContent: true,
      });
    }
  }
  render() {
    const { children } = this.props;
    return (
      <>
      <Helmet>
          <meta charSet="utf-8" />
          <title>My Title</title>
          <html lang="en" />
          <link rel="canonical" href="" />
        </Helmet>
        <a className="focusable visually-hidden" href="#main-content">
          Skip to main content
        </a>
        <Header hideContent={this.hideContent} />
        {this.state.hideContent ? null : (
          <React.Fragment>
            {children}
            <ScrollUpButton
              style={{
                'backgroundColor': 'transparent',
                fill: 'rgb(228, 180, 171)',
              }}
              EasingType="linear"
            />
            <Footer />
          </React.Fragment>
        )}
      </>
    );
  }
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
