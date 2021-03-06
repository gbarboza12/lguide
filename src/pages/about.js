import React from 'react';

import Layout from '../components/layout';

const About = () => {
  return (
    <Layout>
      <main id="main-content" aria-label="Main Content">
        <div className="container-fluid main-container">
          <div className="main-content row justify-content-center h-100">
            <div className="col col-sm-8 col-md-9">
              <div className="page-title-div text-center">
                <h1>About</h1>
              </div>
              <div className="page-text-div" />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default About;
