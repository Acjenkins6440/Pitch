import React, { Component } from "react";

class Card extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className={'card '+this.props.suit}>
        <span className='ulSymbol'>{this.props.symbol}</span>
        <span className='number'>{this.props.number}</span>
        <span className='brSymbol'>{this.props.symbol}</span>
      </div>
    )
  }
}

export default Card;
