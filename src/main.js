import '../styles/reset.css';
import '../styles/main.scss';
import 'babel-polyfill';
import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';
import anime from 'animejs/lib/anime.es.js';

const bezier = '.64,1.53,1,1.07';
const content = document.querySelector('.content-cards');
const rightContent = document.querySelector('.right-content');

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

const removeChildren = (node) => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};

const randomFromArray = (array) => array[Math.floor(array.length * Math.random())];

const playCrawl = () => {
  console.log('crawl');
};

const characterSelect = (films) => {
  removeChildren(rightContent);
  const loading = document.createElement('img');
  loading.src = 'images/loading.gif';
  loading.className = 'loading-gif';
  rightContent.append(loading);
  const film = randomFromArray(films);
  fetchData(film).then((data) => {
    removeChildren(rightContent);
    const img = document.createElement('img');
    img.className = 'poster';
    img.addEventListener('click', playCrawl, false);
    img.src = `images/posters/${data.title.toLowerCase().replace(/ /g, '-')}.jpg`;
    rightContent.append(img);
  });
};

const addCharacterCard = (name, description, films) => {
  const link = document.createElement('a');
  link.className = 'card-link';
  link.addEventListener('click', (e) => { e.preventDefault(); characterSelect(films); }, false);
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
  let amount = 0;
  const minChars = 10;
  fetchData('https://swapi.co/api/people/').then((data) => {
    data.results.forEach((character) => {
      fetchData(character.homeworld).then((data) => {
        addCharacterCard(character.name, data.name, character.films);
        amount++;
        if (amount >= minChars) {
          document.querySelector('.loading').style.opacity = 0;
        }
      });
    });
  });
};

initialize();
