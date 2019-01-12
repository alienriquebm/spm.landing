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