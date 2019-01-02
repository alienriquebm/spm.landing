console.log('\'Allo \'Allo!');
$(window).scroll(function () {
  const scrollValue = $(this).scrollTop();
  $('.main-logo').css('transform', `translate(0px, ${scrollValue / 2}%`);
  $('.main-clouds1').css('transform', `translate(0px, -${scrollValue / 15}%`);
  $('.main-clouds2').css('transform', `translate(0px, -${scrollValue / 55}%`);
  if(scrollValue >= window.innerHeight) {
    console.log("Llegue al máximo")
  }
})