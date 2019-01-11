import $ from 'jquery';

import '../styles/app.scss';

const button = $('#test');
const p = document.querySelector('#secret');

let value = true;

button.click('click', () => {
  if (value) {
    p.classList.add('show');
    p.classList.remove('hide');
    button.innerHTML = "Hide";
  } else {
    p.classList.add('hide');
    p.classList.remove('show');
    button.innerHTML = "Show";
  }
  value = !value;
});



const doTimer = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve('Listo');
  }, 10000);
});

const getTest = async () => {
  try {
    const timer = await doTimer();
    console.log(timer);
  } catch (error) {
    console.log(error);
  }
};

getTest();