if (window.grecaptcha) {
  window.grecaptcha.ready(() => { // eslint-disable-line
    $('#contact-form-button').attr('disabled', false);
    $('#contact-form-button').text('Send');
  });
}