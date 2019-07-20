import React, { Component } from "react"
import injectSheet from 'react-jss'
import cardStyles from '../styles/cardStyles.jss'


const UnstyledCard = ({classes, children, props}) => ( // TODO: do you want ...props here (rest spread)?
  <div className={classes.card}>
    <div className={(props.suit == "♥" || props.suit == "♦") ? classes.red_suit : classes.black_suit}>
      <span className={classes.ulSymbol}>{props.suit}</span>
      <span className={classes.number}>{props.number}</span>
      <span className={classes.brSymbol}>{props.suit}</span>
    </div>
  </div>
)
const Card = injectSheet(cardStyles)(UnstyledCard)

export default Card;
