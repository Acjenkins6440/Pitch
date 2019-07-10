import React, { Component } from "react"
import { render } from 'react-dom'
import injectSheet from 'react-jss'
import cardStyles from '../styles/cardStyles.jss'


const Card = ({classes, children, props}) => (
  <div className={classes.card}>
    <div className={(props.suit == "hearts" || props.suit == "diamonds") ? classes.red_suit : classes.black_suit}>
      <span className={classes.ulSymbol}>{props.symbol}</span>
      <span className={classes.number}>{props.number}</span>
      <span className={classes.brSymbol}>{props.symbol}</span>
    </div>
  </div>
)
console.log(Card)
const StyledCard = injectSheet(cardStyles)(Card)

export default StyledCard;
