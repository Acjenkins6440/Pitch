import React, { useState } from 'react';
import Board from './Board';

const App = () => {
  const [playerSeat, setPlayerSeat] = useState(0)
  return <Board playerSeat={playerSeat}/>
};

export default App
