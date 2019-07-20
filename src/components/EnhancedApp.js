import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from './Card';
import { drawCardActionCreator } from '../redux/actions_and_reducers';

class App extends PureComponent {
  render() {
    return (
      <div>
        <h1>Draw a Card</h1>
        <p>Cards left in deck: {Object.keys(this.props.inDeck).length}</p>
        <h2>{this.props.card.number ? this.props.card.number + " of " + this.props.card.suit : "Click to start drawing!"}</h2>
        <button onClick={() => this.props.drawCard()}>Draw Card</button>
        <Card card={this.props.card} />
      </div>
    );
  }
}

// TODO: read https://react-redux.js.org/using-react-redux/connect-mapdispatch#defining-mapdispatchtoprops-as-an-object
const mapDispatchToProps = {
  drawCard: drawCardActionCreator
}

function mapStateToProps(state) {
  console.log(state)
  return {
    // TODO: This ["syntax"] is unnecessary, but running eslint --fix can auto-fix alot of these things for you
    card: state["drawnCard"],
    inDeck: state["inDeck"],
    inPlay: state["inPlay"]
  };
}


const EnhancedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)


App.propTypes = {
  // TODO: typecheck other props too 
  title: PropTypes.string
}

export default EnhancedApp;
