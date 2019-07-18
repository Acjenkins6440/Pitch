import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Card from './Card.jsx';


class App extends PureComponent {
  render() {
    return (
      <div>
        <h1>Draw a Card</h1>
        <p>Cards left in deck: {Object.keys(this.props.inDeck).length}</p>
        <h2>{this.props.card.number ? this.props.card.number + " of " + this.props.card.suit : "Click to start drawing!"}</h2>
        <button onClick={() => this.props.drawCard()}>Draw Card</button>
        <Card props={this.props.card}/>
      </div>
    );
  }
}

function mapStateToProps(dispatch) {
  console.log(dispatch)
  return bindActionCreators(
    {
      drawCard: () => ({ type: "draw" })
    },
    dispatch
  );
}
function mapDispatchToProps(state) {
  console.log(state)
  return {
    card: state["drawnCard"],
    inDeck: state["inDeck"],
    inPlay: state["inPlay"]
  };
}


const EnhancedApp = connect(
  mapDispatchToProps,
  mapStateToProps
)(App)


App.propTypes = {
  title: PropTypes.string
}

export default EnhancedApp;
