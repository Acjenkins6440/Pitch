import React, { PureComponent } from "react";

const initialState = {};
for(var i = 1; i < 53; i++){
  initialState[i] = {
    index: i,
    inPlay: 0
  }
}

const Deck = initialState;
console.log(initialState);

export default Deck
