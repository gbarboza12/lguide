import React, { Component } from 'react'

import Layout from '../components/layout'

export default class Credits extends Component {
  constructor(props) {
    super(props)

    this.submitForm = this.submitForm.bind(this)
  }

  submitForm() {
    console.log('submit')
  }

  render() {
    return (
      <Layout>
        <div className="container-fluid main-container">
          <div className="main-content row justify-content-center align-items-center h-100">
            <div className="col col-sm-6 col-md-6 ">
              <div className="page-title-div text-center">
                <h1>Credits</h1>
              </div>

              <div className="page-text-div">
                Since we are not omniscient, we are likely to have missed a thing or two (or hundreds). 
                Help us make this guide better with your recommendations of stuff that you think should be on here. 
                Email us or fill out the form below.
                We understand people's desire for privacy, so let us know if you wish to use a different name when credited.
              </div>

              <div>
                <ul>
                  <li>
                  <a href="https://unsplash.com/@jeremyperkins">Jeremy Perkins</a> for cover photo.
                    </li>
                  </ul>
                </div>

              <div id="contact-form">
                <form
                  method="POST"
                  action="https://formspree.io/gbarboza1231@gmail.com"
                >
                  <div className="form-group contact-form" id="contact-form">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="name"
                      required
                    />
                  </div>
                  <div className="form-group contact-form">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      name="email"
                      required
                    />
                  </div>
                  <div className="form-group contact-form">
                    <label htmlFor="message">Message</label>
                    <textarea
                      name="message"
                      className="form-control form-control-lg"
                      rows="6"
                      required
                    />
                  </div>
                  <button
                    className="btn btn-block contact-form-btn"
                    type="submit"
                    aria-label="Submit form"
                    onClick={this.submitForm}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
