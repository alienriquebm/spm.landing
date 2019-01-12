// Libraries
import $ from 'jquery';

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
