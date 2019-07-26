const initializeState = () => {
  const deckArray = [];
  for (let i = 1; i < 14; i++) {
    deckArray.push(`h${i}`);
    deckArray.push(`d${i}`);
    deckArray.push(`s${i}`);
    deckArray.push(`c${i}`);
  }
  return deckArray;
};
const initialState = initializeState();

function resetAndShuffle() {
  const newDeck = initializeState();
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newDeck[i];
    newDeck[i] = newDeck[j];
    newDeck[j] = temp;
  }
  return newDeck;
}

export default function deckReducer(state = initialState, action) {
  switch (action.type) {
    case 'shuffle':
      return resetAndShuffle();
    default:
      return state;
  }
}

export const shuffleDeck = () => ({
  type: 'shuffle',
});
