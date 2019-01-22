import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './header'
import Footer from './footer'
import './styles/layout.css'
import './styles/forms.css'
import './styles/post.css'
import './styles/sidebar.css'

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideContent: false,
    }
    this.hideContent = this.hideContent.bind(this)
  }
  hideContent(collapsed) {
    // if overlay is collapsed, don't hide content
    if(collapsed) {
      this.setState({
        hideContent: false
      })
    } else {
      this.setState({
        hideContent: true
      })
    }
  }
  render() {
    const { children } = this.props;
    return (
      <div>
      <Header hideContent={this.hideContent} />
      {this.state.hideContent ? null :
      <React.Fragment>
        {children}
        <Footer />
      </React.Fragment>
       }
        
      </div>
    )
  }
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

