import React from 'react';

const ContactForm = (props) => {
  const pageContext = props.pageContext;
  const textareaLabel = pageContext === 'credits' ? 'Suggestion(s)' : 'Message';

  return (
    <div id="contact-form">
      <form method="POST" action="https://formspree.io/gbarboza1231@gmail.com">
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
          <label htmlFor="message">{textareaLabel}</label>
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
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default ContactForm;
