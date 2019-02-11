import React, { Component } from 'react';

import Layout from '../components/layout';
import ContactForm from '../components/contact-form';

export default class Credits extends Component {
  render() {
    return (
      <Layout>
        <div className="container-fluid main-container">
          <main id="main-content" aria-label="Main Content">
            <div className="main-content row justify-content-center align-items-center h-100">
              <div className="col col-sm-6 col-md-6 ">
                <div className="page-title-div text-center">
                  <h1>Credits</h1>
                </div>

                <div className="page-text-div">
                  Since we are not omniscient, we likely missed a
                  thing or two (or hundreds). Help us make this guide better
                  by sending us your suggestions of stuff that you think should be on
                  here. Email us or fill out the form below. We understand
                  people's desire for privacy, so let us know if you wish to use
                  a different name when credited.
                </div>

                <div className="credits-list-div">
                  <h2>A huge thanks to...</h2>
                  <ul>
                    <li>
                      <a href="https://unsplash.com/@jeremyperkins">
                        Jeremy Perkins
                      </a>{' '}
                      for the cover photo.
                    </li>
                  </ul>
                </div>
                <ContactForm pageContext={'credits'} />
              </div>
            </div>
          </main>
        </div>
      </Layout>
    );
  }
}
