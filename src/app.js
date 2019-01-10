import './app.scss';

const button = document.querySelector('#test');
const p = document.querySelector('#secret');

let value = true;

button.addEventListener('click', () => {
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

