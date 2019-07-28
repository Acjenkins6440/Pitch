import React from 'react';

const Player = ({ children, selectPlayer }) => (
  <div>
    Select Player:
    <select onChange={e => selectPlayer(e.target.value)}>
      <option value="0">Player 1</option>
      <option value="1">Player 2</option>
      <option value="2">Player 3</option>
      <option value="3">Player 4</option>
    </select>
    {children}
  </div>
);

export default Player;
