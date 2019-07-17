import Redux from 'redux'
import React from 'react'
import PropTypes from 'prop-types';

suit_id_object = {
  0: 'hearts',
  1: 'diamonds',
  2: 'clubs',
  3: 'spades'
};

face_card_object = {
  1: 'ace',
  11: 'jack',
  12: 'queen',
  13: 'king'
};

const drawCardReducer = (state, action) => {
  const index = deckCard.index;
  card_suit_id = Math.floor(index / 13);
  card_num_id = index % 13;
  suit = suit_id_object[card_suit_id];
  if(card_num_id == 0 && index != 0)
    number = 13;
  card = {
    suit: suit,
    number: number,
  }
}

const reducers = {
  cardReducer: cardReducer
}
export default reducers;
