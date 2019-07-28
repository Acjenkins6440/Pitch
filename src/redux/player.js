const initialState = 0;

export default function player(state = initialState, action) {
  switch (action.type) {
    case 'selectPlayer':
      return action.playerNum;
    default:
      return state;
  }
}

export const selectPlayer = (playerNum = 0) => ({
  type: 'selectPlayer',
  playerNum,
});
