import React, { Component } from 'react';

import Layout from '../components/layout';
import ContactForm from '../components/contact-form';

export default class Credits extends Component {
  render() {
    return (
      <Layout>
        <main id="main-content" aria-label="Main Content">
          <div className="container-fluid main-container">
            <div className="main-content row justify-content-center h-100">
              <div className="col col-sm-8 col-md-9">
                <div className="page-title-div text-center">
                  <h1>Credits</h1>
                </div>

                <div className="page-text-div">
                  Since we are not omniscient, we likely missed a thing or two
                  (or hundreds). Help us make this guide better with your recommendations.
                  Email us or fill out the form below. We understand people's
                  desire for privacy, so let us know if you wish to use a
                  different name when credited.
                </div>

                <div className="credits-list-div">
                  <h2><em>A huge thanks to...</em></h2>
                  <ul>
                    <li>
                      
                    </li>
                  </ul>
                </div>
                <ContactForm pageContext={'credits'} />
              </div>
            </div>
          </div>
        </main>
      </Layout>
    );
  }
}
