import React from 'react';
import Button from 'react-bootstrap/Button';

const Lobby = () => (
  <div id="lobby">
    <div class="button-container">
      <Button className="lobby-button">START GAME</Button>
      <Button className="lobby-button sm">JOIN GAME</Button>
    </div>
  </div>
);

export default Lobby;
