// Libraries
import $ from 'jquery';
import 'bootstrap';
import AOS from 'aos';

// Custom Libraries
import './instagram';
import './behance';
import './mail';
import './reCaptcha';

// Other Files
import '../php/mail.php';
import '../favicon.ico';

// Styles
import '../styles/app.scss';

window.$ = window.jQuery = $;

AOS.init(); // eslint-disable-line
$(window).scroll(function execScroll() {
  const scrollValue = $(this).scrollTop();

  $('.nav-item > a').each(function setActiveLink() {
    const currLink = $(this);
    let refElement;
    if (currLink.attr('href') === '#') {
      refElement = $('.main');
    } else {
      refElement = $(currLink.attr('href'));
    }
    if (refElement.position() && (refElement.position()
      .top <= scrollValue && refElement.position().top + (refElement.outerHeight()) > scrollValue)) {
      $('.nav-item > a').removeClass('active');
      currLink.addClass('active');
    } else {
      currLink.removeClass('active');
    }
  });

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