import $ from 'jquery';
import 'bootstrap';
import AOS from 'aos';
import '../php/mail.php';

import '../styles/app.scss';

window.$ = window.jQuery = $;

AOS.init(); // eslint-disable-line
$(window).scroll(function execScroll() {
  const scrollValue = $(this).scrollTop();

  /*   $('.nav-item > a').each(function setActiveLink() {
      const currLink = $(this);
      const refElement = $(currLink.attr('href'));
      if (refElement.position() && (refElement.position()
        .top <= scrollValue && refElement.position().top + refElement.height() > scrollValue)) {
        $('.nav-item > a').removeClass('active');
        currLink.addClass('active');
      } else {
        currLink.removeClass('active');
      }
    }); */

  $('.main-logo').css('transform', `translate(0px, ${scrollValue / 2}%`);
  $('.main-clouds1, .static').css('transform', `translate(0px, -${scrollValue / 5}%`);
  $('.main-clouds2, .static').css('transform', `translate(0px, -${scrollValue / 10}%`);
  $('.main-clouds3, .static').css('transform', `translate(0px, -${scrollValue / 12}%`);
  if (scrollValue >= window.innerHeight) {
    $('.navbar').css('position', 'fixed');
    $('.navbar').css('top', 0);
    $('.navbar').show(100);
    $('.main-logo').hide();
  } else {
    $('.navbar').css('position', 'initial');
    $('.navbar').css('top', 'initial');
    $('.navbar').hide(100);
    $('.main-logo').show();
  }
});

// Main carousel
$('.carousel').carousel({
  interval: 1000 * 7,
});

// Instagram Access

const token = '2297818537.4a9aa16.f9fa6d84db9044189add40af5cf7886e'; // learn how to obtain it below
// const userid = 'sanbricdesigns'; // User ID - get it in source HTML of your Instagram profile
const numPhotos = 8; // how much photos do you want to get

$.ajax({
  url: `https://api.instagram.com/v1/users/self/media/recent/?access_token=${token}`, // or /users/self/media/recent for Sandbox
  dataType: 'jsonp',
  type: 'GET',
  data: { access_token: token, count: numPhotos },
  success: (response) => {
    const images = response.data;
    $('#loader-instagram').hide();
    for (let i = 0; i < images.length; i += 1) {
      const image = images[i];
      $('.instagram-feed').append(`<img src="${image.images.thumbnail.url}"></img>`);
    }
    // for (x in data.data) {
    // $('ul').append('<li><img src="' + data.data[x].images.low_resolution.url + '"></li>');
    // data.data[x].images.low_resolution.url - URL of image, 306х306
    // data.data[x].images.thumbnail.url - URL of image 150х150
    // data.data[x].images.standard_resolution.url - URL of image 612х612
    // data.data[x].link - Instagram post URL
    // },
  },
  error: (data) => {
    console.log(data); // send the error notifications to console
  },
});

// Behance Access
const apiKey = 'eo7VzCzOBa5x6OsDnWH0dqN0FkBFYuKd';
const collection = '170537937';

$.ajax({
  url: `http://behance.net/v2/collections/${collection}/projects?api_key=${apiKey}`, // or /users/self/media/recent for Sandbox
  dataType: 'jsonp',
  type: 'GET',
  // data: { access_token: token, count: numPhotos },
  success: (response) => {
    const { projects } = response;
    $('#loader-behance').hide();
    for (let i = 0; i < projects.length; i += 1) {
      const project = projects[i];
      $('.behance-feed').append(`
      <div class="behance-feed-project">
        <a href='${project.url}' target='_blank'><img src="${project.covers[404]}"></img></a>
        <div class="behance-feed-project-title text-center">
          ${project.name}
        </div>
        <div class="behance-feed-project-stats">
          <div><i class="fas fa-heart"></i><span>${project.stats.appreciations}</span></div>
          <div><i class="fas fa-comment"></i><span>${project.stats.comments}</span></div>
          <div><i class="fas fa-eye"></i><span>${project.stats.views}</span></div>
        </div>
      </div>
        `);
    }
  },
  error: (data) => {
    console.log(data); // send the error notifications to console
  },
});


// ======================= reCaptcha v3 ================================

const script = document.createElement('script');
script.src = 'https://www.google.com/recaptcha/api.js?render=6Lf4KIcUAAAAAJJLHVglp-0qOxL_YuNExFgZ9ath';
document.body.appendChild(script);

let timeout = 100; // 10 seconds timeout

const loadCaptcha = () => {
  setTimeout(() => {
    timeout -= 1;
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => { // eslint-disable-line
        $('#contact-form-button').attr('disabled', false);
        $('#contact-form-button').text('Send');
      });
    } else if (timeout > 0) {
      loadCaptcha();
    } else {
      $('#contact-form-button').text('Failed to load captcha =( check your connection.');
    }
  }, 1000);
}

loadCaptcha();



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