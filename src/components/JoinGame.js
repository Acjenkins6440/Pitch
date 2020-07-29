import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getActiveGames } from '../providers/GameProvider';

const JoinGame = () => {
  const [activeGames, setActiveGames] = useState([])
  
  

  return (
    <div className="join-create-container">
      <h1>Hello!</h1>
    </div>
  )
}

export default JoinGame