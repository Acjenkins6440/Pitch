// TODO: rename this file to index.js and possibly rename parent folder to 'store'
import { createStore, combineReducers } from 'redux';
import deck from './deck';

// TODO: use this reducer -EB 07/20/19
const reducer = combineReducers({
  deck,
});
const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); // eslint-disable-line no-underscore-dangle


// TODO: just have 1 store - its the redux thing to do

export default store;
