import React from 'react';
import PropTypes from 'prop-types';

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

Player.propTypes = {
  children: PropTypes.node.isRequired,
  selectPlayer: PropTypes.func.isRequired,
};

export default Player;
