import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { compose, withHandlers } from 'recompose';

import { shuffleDeck } from '../redux/deck';
import { dealHands } from '../redux/hands';
import { selectPlayer } from '../redux/player';

import Player from './Player';
import Hand from './Hand';
import Card from './Card';

const App = ({
  deck, hands, playerNum, dealHands, selectPlayer, remoteShuffleDeck,
}) => (
  <div>
    <h1>Draw Some Cards!</h1>
    <h2>Click to shuffle!</h2>
    <button type="button" onClick={() => remoteShuffleDeck()}>Shuffle</button>
    <h2>Click to deal!</h2>
    <button type="button" onClick={() => dealHands(deck)}>Deal</button>
    <Player selectPlayer={selectPlayer}>
      <Hand playerNum={playerNum} key={hands[playerNum].toString()}>
        {hands[playerNum].map(card => (
          <span key={card}>
            <Card cardKey={card} />
                &nbsp;
          </span>
        ))}
      </Hand>
    </Player>
  </div>
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
