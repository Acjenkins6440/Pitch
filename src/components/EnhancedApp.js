import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { shuffleDeck } from '../redux/deck';
import PlayerHand from './PlayerHand';
import Card from './Card';
const playerIndexes = [1,2,3,4];

class App extends PureComponent {
  render() {
    const { deck, shuffleDeck } = this.props;
    return (
      <div>
        <h1>Draw a Card</h1>
        <p>
Cards left in deck:
          {deck.length}
        </p>
        <h2>Click to shuffle!</h2>
      { playerIndexes.map( (index) => {
          return <div><PlayerHand handArray={deck.slice(0+(index*6),6+(index*6))} playerIndex={index} /><br /><br /><br /><br /></div>
        })}
        <button onClick={() => shuffleDeck()}>Shuffle</button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  shuffleDeck,
};

function mapStateToProps({ deck }) {
  return {
    deck,
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
