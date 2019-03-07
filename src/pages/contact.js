import React, { Component } from 'react';

import Layout from '../components/layout';
import ContactForm from '../components/contact-form';

export default class Contact extends Component {
  render() {
    return (
      <Layout>
        <main id="main-content" aria-label="Main Content">
          <div className="container-fluid main-container">
            <div className="main-content row justify-content-center h-100">
              <div className="col col-sm-8 col-md-9">
                <div className="page-title-div text-center">
                  <h1>Contact</h1>
                </div>
                <div className="page-text-div">
                  Please reach out via email or fill out the form below for any
                  comments, questions, etc.
                </div>
                <ContactForm pageContext={'contact'} />
              </div>
            </div>
          </div>
        </main>
      </Layout>
    );
  }
}
