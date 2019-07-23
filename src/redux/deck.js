//TODO figure out how to initialize state inside reducer
//Also figure out how to do drawCard() and resetAndShuffle() inside reducer?
const initializeState = () => {
  const deckArray = [];
  for (var i = 1; i < 14; i++) {
    deckArray.push(`h${i}`);
    deckArray.push(`d${i}`);
    deckArray.push(`s${i}`);
    deckArray.push(`c${i}`);
  }
  return deckArray;
};
const initialState = initializeState();

function resetAndShuffle() {
  newDeck = initializeState();
    for (var i = newDeck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = newDeck[i];
        newDeck[i] = newDeck[j];
        newDeck[j] = temp;
    }
    return newDeck;
}

export default function deckReducer(state = initialState, action) {
  switch (action.type) {
    case shuffle:
      return resetAndShuffle();
    case draw:
      return state.slice(0,1);
    default:
      return state;
  }
}

const shuffleDeck = () => {
  return{
    type: "shuffle"
  }
}

const drawCard = () => {
  return{
    type: "draw"
  }
}
