import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import Input from "../presentational/Input.jsx";

class App extends Component {
  constructor() {
    super();

    this.state = {
      title: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    return (
      <Card suit={card.suit} symbol={card.symbol} number={card.number} />
    );
  }
}

App.propTypes = {
  title: PropTypes.string
}

export default App;
