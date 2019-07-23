// TODO: rename this file to index.js and possibly rename parent folder to 'store'
import { createStore, combineReducers } from 'redux'
import actions_and_reducers from './actions_and_reducers'
import deck from './deck';

// TODO: get rid of actions_and_reducers object, use separate files
// with their own exported actionCreators and reducers  under /redux folder
const draw = actions_and_reducers['draw_action'];

// TODO: use this reducer -EB 07/20/19
const reducer = combineReducers({
  deck,
})
<<<<<<< HEAD
const deckStore = createStore(draw, deckState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
=======
const deckStore = createStore(deck);
console.log(deckStore.getState())
>>>>>>> Making deckState an array

// TODO: just have 1 store - its the redux thing to do
const stores = {
  deckStore: deckStore
};

export default stores;
