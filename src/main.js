import '../styles/reset.css';
import '../styles/main.scss';
import 'babel-polyfill';
import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';
import anime from 'animejs/lib/anime.es.js';

const bezier = '.64,1.53,1,1.07';
const content = document.querySelector('.content-cards');

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

async function fetchDataAmbiguous(resource) {
  const result = await fetch(resource, { method: 'GET', mode: 'cors' })
    .then((resp) => resp.json())
    .then((data) => data);
  return result;
}

const createAndClassElement = (className) => {
  const element = document.createElement('div');
  element.className = className;
  return element;
};

const addText = (element, text) => {
  element.append(document.createTextNode(text));
};

const characterSelect = () => {
  console.log('zxcv');
};

const addCharacterCard = (name, description) => {
  const link = document.createElement('a');
  link.className = 'card-link';
  link.addEventListener('click', characterSelect, false);
  const card = createAndClassElement('card');
  const cardContent = createAndClassElement('card-content');
  const media = createAndClassElement('media');
  const mediaContent = createAndClassElement('media-content');
  const title = document.createElement('p');
  title.className = 'title is-4';
  addText(title, name);
  mediaContent.append(title);
  media.append(mediaContent);
  const contenta = createAndClassElement('content');
  addText(contenta, `Homeworld: ${description}`);
  cardContent.append(media);
  cardContent.append(contenta);
  card.append(cardContent);
  link.append(card);
  content.append(link);
};

const initialize = () => {
  fetchData('people/').then((data) => {
    document.querySelector('.loading').style.opacity = 0;
    data.results.forEach((character) => {
      fetchDataAmbiguous(character.homeworld).then((data) => {
        addCharacterCard(character.name, data.name);
      });
    });
  });
};

initialize();
