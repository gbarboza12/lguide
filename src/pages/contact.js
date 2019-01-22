import React, { Component } from 'react'

import Layout from '../components/layout'

export default class Sidebar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout>
        <div className="container-fluid main-container">
          <div className="main-content row justify-content-center align-items-center h-100">
            <div className="col col-sm-6 col-md-6 ">
              <div className="page-title-div text-center">
                <h1>Contact</h1>
              </div>

              <div className="page-text-div">
                Please reach out via email or fill out the form below for any
                comments, questions, etc.
              </div>

              <div id="contact-form">
                <form
                  method="POST"
                  action="https://formspree.io/gbarboza1231@gmail.com"
                >
                  <div className="form-group contact-form" id="contact-form">
                    <label for="name">Name</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="name"
                    />
                  </div>
                  <div class="form-group contact-form">
                    <label for="email">Email</label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      name="email"
                    />
                  </div>
                  <div class="form-group contact-form">
                    <label for="message">Message</label>
                    <textarea
                      name="message"
                      className="form-control form-control-lg"
                      rows="6"
                    />
                  </div>
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
