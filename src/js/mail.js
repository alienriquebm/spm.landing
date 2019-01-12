// Mail

$(() => {
  // Get the form.
  const form = $('#contact-form');

  // Get the messages div.
  const formMessages = $('.form-message');

  // Set up an event listener for the contact form.
  $(form).submit((e) => {
    // Stop the browser from submitting the form.
    e.preventDefault();

    // Serialize the form data.
    let formData = $(form).serialize();


    grecaptcha.execute('6Lf4KIcUAAAAAJJLHVglp-0qOxL_YuNExFgZ9ath', { action: 'contactus' }) // eslint-disable-line
      .then((response) => {
        const token = response;
        formData = `${formData}&g-recaptcha-response=${token}`;
        // Submit the form using AJAX.
        $.ajax({
          type: 'POST',
          url: $(form).attr('action'),
          data: formData,
        })
          .done((response) => {
            // Make sure that the formMessages div has the 'success' class.
            $(formMessages).removeClass('error');
            $(formMessages).addClass('success');

            // Set the message text.
            $('.contact-form-message').addClass('alert-success').show();
            $(formMessages).text(response);

            // Clear the form.
            $('#contact-form input,#contact-form textarea').val('');
          })
          .fail((data) => {
            console.log('data', data);
            // Make sure that the formMessages div has the 'error' class.
            $(formMessages).removeClass('success');
            $(formMessages).addClass('error');

            // Set the message text.
            if (data.responseText !== '') {
              $('.contact-form-message').addClass('alert-danger').show();
              $(formMessages).text(data.responseText);
            } else {
              $('.contact-form-message').addClass('alert-danger').show();
              $(formMessages).text('Oops! An error occured and your message could not be sent.');
            }
          });
      });

  });
});