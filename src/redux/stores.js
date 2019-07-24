// TODO: rename this file to index.js and possibly rename parent folder to 'store'
import { createStore, combineReducers } from 'redux'
import actions_and_reducers from './actions_and_reducers'
import deck from './deck';

const initializeDeckState = () => {
  const deckState = {};
  deckState.inPlay = {};
  deckState.inDeck = {};
  for (var i = 1; i < 53; i++) {
    deckState.inDeck[i] = i;
  }
  deckState["drawnCard"] = {};
  return deckState;
};
// TODO: Let each sub-reducer handle its own initialState
const deckState = initializeDeckState();

// TODO: get rid of actions_and_reducers object, use separate files 
// with their own exported actionCreators and reducers  under /redux folder 
const draw = actions_and_reducers['draw_action'];

// TODO: use this reducer -EB 07/20/19
const reducer = combineReducers({
  deck,
})
const deckStore = createStore(draw, deckState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// TODO: just have 1 store - its the redux thing to do 
const stores = {
  deckStore: deckStore
};

export default stores;
