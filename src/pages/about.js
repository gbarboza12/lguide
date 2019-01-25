import React from 'react';

import Layout from '../components/layout';

const About = () => {
  return (
    <Layout>
      <div className="container-fluid main-container">
        <div className="main-content row justify-content-center align-items-center h-100">
          <div className="col col-sm-6 col-md-6 ">
            <div className="page-title-div text-center">
              <h1>About</h1>
            </div>

            <div className="page-text-div" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
