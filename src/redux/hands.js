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
    deck.slice(0, 6),
    deck.slice(6, 12),
    deck.slice(12, 18),
    deck.slice(18, 24),
  ];
  return {
    type: 'deal',
    data: hands,
  };
};
