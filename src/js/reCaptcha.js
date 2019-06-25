// Libraries
import $ from 'jquery';

// Load reCaptcha script dinamically
const head = document.getElementsByTagName('head')[0];
const script = document.createElement('script');
script.type = 'text/javascript';
script.onload = () => {
  if (window.grecaptcha) {
    window.grecaptcha.ready(() => { // eslint-disable-line
      $('#contact-form-button').attr('disabled', false);
      $('#contact-form-button').text('Send');
    });
  }
};
script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.RECAPTCHA_SECRET}`;
head.appendChild(script);
