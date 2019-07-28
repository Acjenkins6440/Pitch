// TODO: rename this file to index.js and possibly rename parent folder to 'store'
import { createStore, combineReducers } from 'redux';
import deck from './deck';
import hands from './hands';
import playerNum from './player';

const reducer = combineReducers({
  deck,
  hands,
  playerNum,
});
const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); // eslint-disable-line no-underscore-dangle


export default store;
