import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { shuffleDeck } from '../redux/deck'

class App extends PureComponent {
  render() {
    const { deck, shuffleDeck } = this.props;
    return (
      <div>
        <h1>Draw a Card</h1>
        <p>Cards left in deck: {deck.length}</p>
        <h2>Click to shuffle!</h2>
        <button onClick={() => shuffleDeck()}>Shuffle</button>
      </div>
    );
  }
}

// TODO: read https://react-redux.js.org/using-react-redux/connect-mapdispatch#defining-mapdispatchtoprops-as-an-object
const mapDispatchToProps = {
  shuffleDeck
}

function mapStateToProps( { deck } ) {
  return {
    deck
  };
}

const EnhancedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

App.propTypes = {
  // TODO: typecheck other props too
  shuffleDeck: PropTypes.func.isRequired,
  deck: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default EnhancedApp;
