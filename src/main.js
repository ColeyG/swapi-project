import '../styles/reset.css';
import '../styles/main.scss';
import 'babel-polyfill';
import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';

async function fetchData(resource) {
  const result = await fetch(`https://swapi.co/api/${resource}`, { method: 'GET', mode: 'cors' })
    .then((resp) => resp.json())
    .then((data) => data);
  return result;
}

const initialize = () => {
  fetchData('people/').then((data) => {
    console.log(data.results);
  });
};

initialize();
