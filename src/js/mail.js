// Libraries
import $ from 'jquery';
import 'jquery-toast-plugin';

$(() => {
  // Get the form.
  const form = $('#contact-form');

  // Set up an event listener for the contact form.
  $(form).submit((e) => {
    // Stop the browser from submitting the form.
    e.preventDefault();

    // Serialize the form data.
    let formData = $(form).serializeArray();

    // Serialize data function
    function objectifyForm(formArray) {
      const returnArray = {};
      for (let i = 0; i < formArray.length; i += 1) {
        returnArray[formArray[i].name] = formArray[i].value;
      }
      return returnArray;
    }

    const formDataParsed = objectifyForm(formData);

    // Lock the form
    $('#contact-form :input').attr('disabled', true);
    $('#contact-form :button').attr('disabled', true);

    grecaptcha.execute(process.env.RECAPTCHA_SECRET, { action: 'contactus' }) // eslint-disable-line
      .then((response) => {
        const token = response;
        formData = `${formData}&g-recaptcha-response=${token}`;
        // Submit the form using AJAX.
        $.ajax({
          type: 'POST',
          url: `${process.env.API_URL}/contactus`,
          data: {
            data: formDataParsed,
            recaptcha: token,
          },
        })
          .done((res) => {
            // Clear the form.
            $('#contact-form input,#contact-form textarea').val('');
            $.toast({
              heading: 'Success!',
              text: res,
              position: 'top-right',
              bgColor: '#8b8783',
              textColor: 'white',
              stack: false,
              icon: 'info',
            });
            $('#contact-form :input').attr('disabled', false);
            $('#contact-form :button').attr('disabled', false);
          })
          .fail((data) => {
            console.log('data', data);
            // Set the message text.
            if (data.responseText !== '') {
              $.toast({
                heading: 'Error',
                text: data.responseText,
                position: 'top-right',
                stack: false,
                icon: 'error',
              });
            } else {
              $.toast({
                heading: 'Error',
                text: 'Oops! An error occured and your message could not be sent.',
                position: 'top-right',
                stack: false,
                icon: 'error',
              });
            }
            $('#contact-form :input').attr('disabled', false);
            $('#contact-form :button').attr('disabled', false);
          });
      });
  });
});
