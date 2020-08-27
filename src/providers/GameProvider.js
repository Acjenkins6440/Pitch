import { navigate } from '@reach/router';
import { db } from '../firebase';
import { generateBotName } from '../providers/AIProvider'

let activeGameKey = '';
let isOwner = false;

const setActiveGameKey = (newKey) => {
  activeGameKey = newKey;
};

const setOwner = (ownerBool) => {
  isOwner = ownerBool;
};

const getOwner = () => {
  return isOwner
}

const gameExists = () => {
  return !!(activeGameKey)
}

const createGame = (gameProps, userData, setLoading, setError, setActiveGame) => {
  setLoading(true);
  const newGameId = `${userData.uid}${new Date().getTime()}`;
  const gameRef = db.ref(`games/active/${newGameId}`);
  const user = {
    uid: userData.uid,
    displayName: userData.displayName,
    hand: ''
  };
  const gameData = {
    status: 'lobby',
    owner: user,
    users: [user],
    ...gameProps,
    gameKey: newGameId
  };

  gameRef.set(gameData).then(() => {
    setActiveGameKey(newGameId);
    setOwner(true);
    setActiveGame({ ...gameData, gameKey: newGameId });
    setLoading(false);
  }).catch((error) => {
    setError(error);
    setLoading(false);
  });
};

const getActiveGame = () => {
  const gameRef = db.ref(`games/active/${activeGameKey}`);
  gameRef.once('value', snapshot => snapshot.val());
};

const getActiveGames = (setActiveGames) => {
  const gamesRef = db.ref('games/active/');
  gamesRef.once('value').then((snapshot) => {
    const gameObject = snapshot.val();
    if(gameObject){
      const games = [];
      Object.keys(gameObject).forEach((key) => {
        games.push({ ...gameObject[key], key });
      });
      setActiveGames(games);
    }
  });
};

const joinGame = (userData, gameKey, setActiveGame, navigate, setError) => {
  const gameRef = db.ref(`games/active/${gameKey}`);
  const playerJoinedRef = db.ref(`games/active/${gameKey}/playerJoined`);
  const gameData = { gameKey };
  gameRef.once('value').then((snapshot) => {
    Object.assign(gameData, snapshot.val());
    const players = gameData.users;
    const error = {
      code: '',
      message: '',
    };
    if (players.length < 4 && gameData.status === 'lobby') {
      return;
    }
    if (players.length >= 4) {
      error.code = 'number of players';
      error.message = 'That game has already been filled';
    } else if (gameData.status === 'in progress') {
      error.code = 'game state';
      error.message = 'That game has already started';
    } else {
      error.code = 'misc.';
      error.message = 'Something went wrong, the game probably closed';
    }
    throw error;
  }).then(() => {
    playerJoinedRef.set({ uid: userData.uid, displayName: userData.displayName });
  }).then(() => {
    setActiveGameKey(gameKey);
    setActiveGame(gameData);
    navigate('/game');
  }).catch((error) => { setError(error); });
};

const detatchPlayerListeners = () => {
  const playersRef = db.ref(`games/active/${activeGameKey}/users`);
  const gameRef = db.ref(`games/active/${activeGameKey}`);
  playersRef.off();
  gameRef.off();
};

const detatchOwnerListeners = () => {
  const playerLeftRef = db.ref(`games/active/${activeGameKey}/playerLeft`);
  const playerJoinedRef = db.ref(`games/active/${activeGameKey}/playerJoined`);
  playerLeftRef.off();
  playerJoinedRef.off();
};

const detatchUniversalListeners = () => {
  const endpoint = `games/active/${activeGameKey}`
  const statusRef = db.ref(`${endpoint}/status`);
  const phaseRef = db.ref(`${endpoint}/phase`);
  const currentBidRef = db.ref(`${endpoint}/currentBid`);
  const playerRef = db.ref(`${endpoint}/users`)
  statusRef.off()
  phaseRef.off()
  currentBidRef.off()
  playerRef.off()
}

const deleteGame = (gameKey) => {
  const gameRef = db.ref(`games/active/${gameKey}`);
  gameRef.remove();
};

const leaveGame = (userData, gameData, setActiveGame, navigate) => {
  detatchUniversalListeners()
  if (!isOwner) {
    detatchPlayerListeners();
    const playerLeftRef = db.ref(`games/active/${activeGameKey}/playerLeft`);
    playerLeftRef.set({ uid: userData.uid }).then(() => {
      if (navigate) {
        navigate('/');
      }
    });
  } else {
    detatchOwnerListeners();
    deleteGame(activeGameKey);
  }
  if (setActiveGame) {
    setActiveGame({});
  }
  setActiveGameKey('');
  setOwner(false);
};

const addOrRemovePlayer = (playerData, gameData, action, setActiveGame) => {
  const playersRef = db.ref(`games/active/${activeGameKey}/users`);
  const players = gameData.users;
  if (action === 'remove') {
    const playerIndex = players.findIndex(user => user.uid === playerData.uid);
    players.splice(playerIndex, 1);
  } else {
    players.push(playerData);
  }
  setActiveGame({ ...gameData, users: players });
  playersRef.set(players);
};

const initOwnerListenValues = (gameData, setActiveGame) => {
  const endpoint = `games/active/${activeGameKey}`
  const playerLeftRef = db.ref(`${endpoint}/playerLeft`);
  const playerJoinedRef = db.ref(`${endpoint}/playerJoined`);

  playerLeftRef.on('value', (snapshot) => {
    const playerToRemove = snapshot.val();
    if (playerToRemove && playerToRemove.uid) {
      const action = 'remove';
      addOrRemovePlayer(playerToRemove, gameData, action, setActiveGame);
      playerLeftRef.set({});
    }
  });
  playerJoinedRef.on('value', (snapshot) => {
    const playerToAdd = snapshot.val();
    if (playerToAdd && playerToAdd.uid) {
      const action = 'add';
      addOrRemovePlayer(playerToAdd, gameData, action, setActiveGame);
      playerJoinedRef.set({});
    }
  });
  initUniversalListenValues(setActiveGame)
};

const initPlayerListenValues = (setActiveGame, navigate) => {
  const endpoint = `games/active/${activeGameKey}`
  const gameRef = db.ref(`${endpoint}`);
  gameRef.on('value', (snapshot) => {
    if (!snapshot.val()) {
      setActiveGameKey('')
      setActiveGame({})
      navigate('/');
    }
  });
  initUniversalListenValues(setActiveGame)
};

const initUniversalListenValues = (setActiveGame) => {
  const endpoint = `games/active/${activeGameKey}`
  const statusRef = db.ref(`${endpoint}/status`);
  const phaseRef = db.ref(`${endpoint}/phase`);
  const currentBidRef = db.ref(`${endpoint}/currentBid`);
  const playerRef = db.ref(`${endpoint}/users`)
  playerRef.on('value', (snapshot) => {
    getFreshGameData().then((gameData) => {
      setActiveGame(gameData)
    })
  })
  // phaseRef.on('value', (snapshot) => {
  //   const newPhase = snapshot.val();
  //   getFreshGameData().then((gameData) => {
  //     setActiveGame({ ...gameData, phase: newPhase })
  //   })
  // });
  // statusRef.on('value', (snapshot) => {
  //   const newStatus = snapshot.val();
  //   getFreshGameData().then((gameData) => {
  //     setActiveGame({ ...gameData, status: newStatus })
  //   })
  // })
  // currentBidRef.on('value', (snapshot) => {
  //   const newBid = snapshot.val();
  //   getFreshGameData().then((gameData) => {
  //     setActiveGame({ ...gameData, currentBid: newBid })
  //   })
  // })
}

const getFreshGameData = () => {
  const gameRef = db.ref(`games/active/${activeGameKey}`)
  return gameRef.once('value').then((snapshot) => snapshot.val())
}

const startGame = (gameData, setActiveGame) => {
  const gameRef = db.ref(`games/active/${activeGameKey}`)
  const updates = inProgressGameData(gameData)
  gameRef.set(updates)
  gameRef.once('value').then((snapshot) => {
    const activeGame = snapshot.val()
    setActiveGame(activeGame)
  })
}

const inProgressGameData = (gameData) => {
  const deck = []
  const numbers = [2,3,4,5,6,7,8,9,10,'J','Q','K','A']
  numbers.forEach((number) => {
    deck.push(`${number}H`)
    deck.push(`${number}D`)
    deck.push(`${number}S`)
    deck.push(`${number}C`)
  })
  const botNames = []
  for(let i = 0; i < 4; i++){
    if(!gameData.users[i]){
      gameData.users[i] = { uid: `bot${i}`, isBot: true, displayName: generateBotName(botNames)}
    }
  }
  gameData.users.forEach((user) => {
    user.hand = []
  })
  return { 
    ...gameData,
    status: 'in progress',
    phase: 'deal',
    deck: deck,
    inPlay: '',
    trump: '',
    dealerIndex: 0,
    scorePiles: {
      team1: '',
      team2: ''
    },
    currentBid: {
      bid: 0,
      player: ''
    },
    playersTurn: gameData.owner.uid
  }
}

const shuffleDeck = (deck) => {
  //Fisher Yates shuffle algorithm 
  let i = 52
  while(i--){
    let ri = Math.floor(Math.random() * (i+1))
    const temp = deck[i]
    deck[i] = deck[ri]
    deck[ri] = temp
  }
  return deck
}

const setBid = (bid) => {
  const bidRef = db.ref(`games/active/${activeGameKey}/currentBid`)
  bidRef.set(bid).then(() => nextTurn())
}

const deal = (gameData, setActiveGame) => {
  const deck = shuffleDeck(gameData.deck)
  const playerRef = db.ref(`games/active/${activeGameKey}/users`)
  gameData.users.forEach((player, index) => {
    const offset = index * 6
    const begin = offset
    const end = offset + 6
    player.hand = deck.slice(begin, end)
  })
  playerRef.set(gameData.users)
  nextPhase(setActiveGame)
}

const nextPhase = (setActiveGame) => {

}

export {
  createGame,
  getActiveGames,
  getActiveGame,
  joinGame,
  deleteGame,
  leaveGame,
  initOwnerListenValues,
  initPlayerListenValues,
  startGame,
  getOwner,
  gameExists,
  setBid,
  deal,
};
