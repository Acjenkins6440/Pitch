import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import Card from './Card.jsx';

class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      title: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {

    return (
      <Card suit='hearts' number={3} symbol='♥'/>
    );
  }
}

App.propTypes = {
  title: PropTypes.string
}

export default App;
