console.log('\'Allo \'Allo!');
$(window).scroll(function execScroll() {
  const scrollValue = $(this).scrollTop();
  $('.main-logo').css('transform', `translate(0px, ${scrollValue / 2}%`);
  $('.main-clouds1').css('transform', `translate(0px, -${scrollValue / 15}%`);
  $('.main-clouds2').css('transform', `translate(0px, -${scrollValue / 55}%`);
  $('.main-clouds3').css('transform', `translate(0px, -${scrollValue / 35}%`);
  $('.main-clouds4').css('transform', `translate(0px, -${scrollValue / 25}%`);
  if (scrollValue >= window.innerHeight) {
    $('.navbar').css('position', 'fixed');
    $('.navbar').css('top', 0);
    $('.main-logo').hide();
  } else {
    $('.navbar').css('position', 'initial');
    $('.navbar').css('top', 'initial');
    $('.main-logo').show();
  }
});

$('.carousel').carousel({
  interval: 1000 * 7,
});
