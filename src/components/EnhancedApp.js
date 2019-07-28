import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { shuffleDeck } from '../redux/deck';
import { dealHands } from '../redux/hands';
import { selectPlayer } from '../redux/player';

import Player from './Player';
import Hand from './Hand';
import Card from './Card';

class App extends PureComponent {
  render() {
    const {
      deck, hands, playerNum, shuffleDeck, dealHands, selectPlayer,
    } = this.props;
    return (
      <div>
        <h1>Draw a Card</h1>
        <p>
          Cards left in deck:
          {deck.length}
        </p>
        <h2>Click to shuffle!</h2>
        <button onClick={() => shuffleDeck()}>Shuffle</button>
        <h2>Click to deal!</h2>
        <button onClick={() => dealHands(deck)}>Deal</button>
        <Player selectPlayer={selectPlayer}>
          <Hand playerNum={playerNum} key={hands[playerNum].toString()}>
            {hands[playerNum].map(card => (
              <span key={card}>
                {/* <Card card={card} key={card} /> */}
                {card}
,&nbsp;
              </span>
            ))}
          </Hand>
        </Player>
      </div>
    );
  }
}

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

const EnhancedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

App.propTypes = {
  shuffleDeck: PropTypes.func.isRequired,
  deck: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default EnhancedApp;
