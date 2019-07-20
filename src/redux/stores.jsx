import { createStore, combineReducers } from 'redux'
import actions_and_reducers from './actions_and_reducers.jsx'
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
const deckState = initializeDeckState();

const draw = actions_and_reducers['draw_action'];
const reducer = combineReducers({
  deck,
})
const deckStore = createStore(draw, deckState);
const stores = {
  deckStore: deckStore
};

export default stores;
