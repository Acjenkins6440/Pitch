import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { compose, withHandlers } from 'recompose';

import { shuffleDeck } from '../redux/deck';
import { dealHands } from '../redux/hands';
import { selectPlayer } from '../redux/player';

import Board from './Board';


const App = ({
  deck, hands, playerNum, dealHands, selectPlayer, remoteShuffleDeck,
}) => (
  <Board
    deck={deck}
    hands={hands}
    playerNum={playerNum}
    dealHands={dealHands}
    selectPlayer={selectPlayer}
    remoteShuffleDeck={remoteShuffleDeck}
  />
);

const enhance = compose(
  withFirebase,
  withHandlers({
    remoteShuffleDeck: ({ shuffleDeck, firebase }) => () => {
      console.log('firebase pushed shuffle'); //eslint-disable-line 
      shuffleDeck();
      firebase.push('shuffle', 'shuffled');
    },
  }),
);

const mapDispatchToProps = {
  shuffleDeck,
  dealHands,
  selectPlayer,
};

function mapStateToProps({ deck, hands, playerNum }) {
  return {
    deck,
    hands,
    playerNum,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(enhance(App));

App.propTypes = {
  dealHands: PropTypes.func.isRequired,
  selectPlayer: PropTypes.func.isRequired,
  remoteShuffleDeck: PropTypes.func.isRequired,
  firebase: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  deck: PropTypes.arrayOf(PropTypes.string).isRequired,
  hands: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  playerNum: PropTypes.number.isRequired,
};
