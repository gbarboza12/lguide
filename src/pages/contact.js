import React, { Component } from 'react';

import Layout from '../components/layout';
import ContactForm from '../components/contact-form';

export default class Contact extends Component {
  render() {
    return (
      <Layout>
        <div className="container-fluid main-container">
          <main id="main-content">
            <div className="main-content row justify-content-center align-items-center h-100">
              <div className="col col-sm-6 col-md-6 ">
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
          </main>
        </div>
      </Layout>
    );
  }
}
