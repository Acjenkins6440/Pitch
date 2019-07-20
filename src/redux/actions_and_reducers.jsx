
// TODO: Remove coupling between view and state: 
const suit_id_object = {
  0: '♥',
  1: '♦',
  2: '♣',
  3: '♠'
};
const face_card_object = {
  1: 'A',
  11: 'J',
  12: 'Q',
  13: 'K'
};
// TODO: Just randomize the deck at the start of the game and use Array.slice to take cards off the top 
const getRandomIndexOfObject = inDeck => {
  var keys = Object.keys(inDeck);
  return Math.floor(keys.length * Math.random());
};

export const drawCardActionCreator = () => {
  return { type: "draw" };
}

const drawCard = state => {
  const inDeck = state["inDeck"];
  const inPlay = state["inPlay"];
  const card = getCardFromDeck(inDeck);
  const newInPlay = Object.assign({}, inPlay);
  newInPlay[card.index] = card;
  const newInDeck = Object.assign({}, inDeck);
  delete newInDeck[card.index];
  // const { card.index, ...newInDeck } = inDeck;
  const newState = {
    inDeck: newInDeck,
    inPlay: newInPlay,
    drawnCard: card
  };
  return newState;
};

const getCardFromDeck = inDeck => {
  var cardIndex = getRandomIndexOfObject(inDeck);
  var cardId = Object.keys(inDeck)[cardIndex];
  var card_num = (cardId % 13) == 0 ? 13 : cardId % 13;
  var card_suit_id = (Math.floor(cardId / 13) == 4) ? 3 : Math.floor(cardId / 13);
  const card = {
    suit: suit_id_object[card_suit_id],
    number: (1 < card_num && card_num < 11) ? card_num : face_card_object[card_num],
    index: cardId
  };
  return card;
};

// TODO: Rename this to something that could describe a stateful object
const draw = (state, action) => {
  switch (action.type) {
    case "draw":
      return drawCard(state);
    default:
      return state;
  }
}

// TODO: Just export const draw ... and export anything else you need using non-default export syntax, 
// then modules that consume this can be more explicit with what theyre importing 
const actions_and_reducers = {
  draw_action: draw
}

export default actions_and_reducers;
