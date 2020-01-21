import '../styles/reset.css';
import '../styles/main.scss';
import 'babel-polyfill';
import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';
import anime from 'animejs/lib/anime.es.js';

const bezier = '.64,1.53,1,1.07';

anime({
  targets: '.load-ball',
  keyframes: [{ rotate: 45 }, { rotate: 90 }, { rotate: 135 }, { rotate: 180 }],
  loop: true,
  easing: `cubicBezier(${bezier})`,
});

anime({
  targets: '.load-body',
  keyframes: [{ rotate: 45 }, { rotate: 90 }, { rotate: 135 }, { rotate: 180 }],
  loop: true,
  easing: `cubicBezier(${bezier})`,
});

async function fetchData(resource) {
  const result = await fetch(`https://swapi.co/api/${resource}`, { method: 'GET', mode: 'cors' })
    .then((resp) => resp.json())
    .then((data) => data);
  return result;
}

const initialize = () => {
  fetchData('people/').then((data) => {
    console.log(data.results);
    document.querySelector('.loading').style.opacity = 0;
  });
};

initialize();
