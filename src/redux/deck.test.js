import deckReducer, { shuffleDeck } from './deck';

describe('Action Creators', () => {
  it('should create a shuffle action', () => {
    const expectedAction = {
      type: 'shuffle',
    };
    expect(shuffleDeck()).toEqual(expectedAction);
  });
});
const initialState = deckReducer(undefined, { type: 'null' });
const shuffledDeck = deckReducer(undefined, shuffleDeck());

describe('Reducers', () => {
  it('should initialize the deck array state', () => {
    expect(initialState.length).toEqual(52);
  });
  describe('Shuffle Deck', () => {
    it('should return a deck with the same length as initialState', () => {
      expect(shuffledDeck.length).toEqual(initialState.length);
    });
    it('should be a different deck than initialState', () => {
      expect(initialState).not.toEqual(shuffledDeck);
    });
  });
});
