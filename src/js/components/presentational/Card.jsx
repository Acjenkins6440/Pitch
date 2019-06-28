import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';

class Card extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className='card ' + {this.props.suit}>
        <span class='ulSymbol'>{this.props.symbol}</span>
        <span class='number'>{this.props.number}</span>
        <span class='brSymbol'>{this.props.symbol}</span>
      </div>
    )
  }
}

export default Card;
