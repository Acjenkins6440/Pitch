const initialState = [[], [], [], []];

export default function handsReducer(state = initialState, action) {
  switch (action.type) {
    case 'deal':
      return [
        ...action.data,
      ];
    default:
      return state;
  }
}

export const dealHands = (deck) => {
  const hands = [
    deck.slice(0, 6).sort(),
    deck.slice(6, 12).sort(),
    deck.slice(12, 18).sort(),
    deck.slice(18, 24).sort(),
  ];
  return {
    type: 'deal',
    data: hands,
  };
};
