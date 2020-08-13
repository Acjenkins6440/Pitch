import { db } from '../firebase';
import { navigate } from '@reach/router';

let activeGameKey = ''
let isOwner = false

const setActiveGameKey = (newKey) => {
  activeGameKey = newKey
}

const setOwner = (ownerBool) => {
  isOwner = ownerBool
}
 
const createGame = (gameProps, userData, setLoading, setError, setActiveGame) => {
  setLoading(true);
  const newGameId = `${userData.uid}${new Date().getTime()}`;
  const gameRef = db.ref(`games/active/${newGameId}`);
  const user = {
    uid: userData.uid,
    displayName: userData.displayName,
  };
  const gameData = {
    status: 'lobby',
    owner: user,
    users: [user],
    ...gameProps,
  };
  gameRef.set(gameData).then(() => {
    setActiveGameKey(newGameId)
    setOwner(true)
    setActiveGame({ ...gameData, gameKey: newGameId });
    setLoading(false);
  }).catch((error) => {
    setError(error);
    setLoading(false);
  });
};

const getActiveGame = () => {
  const gameRef = db.ref(`games/active/${activeGameKey}`)
  gameRef.once('value', (snapshot) => {
    return snapshot.val()
  })
}

const getActiveGames = (setActiveGames) => {
  const gamesRef = db.ref('games/active/');
  gamesRef.once('value').then((snapshot) => {
    const gameObject = snapshot.val();
    const games = [];
    Object.keys(gameObject).forEach((key) => {
      games.push({ ...gameObject[key], key });
    });
    setActiveGames(games);
  });
};

const joinGame = (userData, gameKey, setActiveGame, navigate, setError) => {
  const gameRef = db.ref(`games/active/${gameKey}`)
  const playerJoinedRef = db.ref(`games/active/${gameKey}/playerJoined`)
  const gameData = { gameKey }
  gameRef.once('value').then((snapshot) => {
    Object.assign(gameData, snapshot.val())
    const players = gameData.users
    const error = {
      code: '',
      message: ''
    }
    if(players.length < 4 && gameData.status == 'lobby'){
      return 
    }
    else if(players.length >= 4){
      error.code = 'number of players'
      error.message = 'That game has already been filled'
    }
    else if(gameData.status == 'in progress'){
      error.code = 'game state'
      error.message = 'That game has already started'
    }
    else{
      error.code = "misc."
      error.message = "Something went wrong, the game probably closed"
    }
    throw error
  }).then(() => {
    playerJoinedRef.set({ uid: userData.uid, displayName: userData.displayName })
  }).then(() => {
    setActiveGameKey(gameKey)
    setActiveGame(gameData)
    navigate('/game')
  }).catch((error) => {setError(error)})
};

const leaveGame = (userData, gameData, setActiveGame, navigate) => {
  if(!isOwner){
    detatchPlayerListeners()
    const playerLeftRef = db.ref(`games/active/${activeGameKey}/playerLeft`)
    playerLeftRef.set({uid: userData.uid}).then(() => {
      if(navigate){
        navigate('/')
      }
    })
  }
  else{
    detatchOwnerListeners()
    deleteGame(activeGameKey)
  }
  if(setActiveGame){
    setActiveGame({})
  }
  setActiveGameKey('')
  setOwner(false)
}

const detatchPlayerListeners = () => {
  const playersRef = db.ref(`games/active/${activeGameKey}/users`)
  const gameRef = db.ref(`games/active/${activeGameKey}`)
  playersRef.off()
  gameRef.off()
}

const detatchOwnerListeners = () => {
  const playerLeftRef = db.ref(`games/active/${activeGameKey}/playerLeft`)
  const playerJoinedRef = db.ref(`games/active/${activeGameKey}/playerJoined`)
  playerLeftRef.off()
  playerJoinedRef.off()
}

const initOwnerListenValues = (gameData, setActiveGame) => {
  const playerLeftRef = db.ref(`games/active/${activeGameKey}/playerLeft`)
  const playerJoinedRef = db.ref(`games/active/${activeGameKey}/playerJoined`)
  playerLeftRef.on('value', (snapshot) => {
    const playerToRemove = snapshot.val()
    if(playerToRemove && playerToRemove.uid){
      const action = "remove"
      addOrRemovePlayer(playerToRemove, gameData, action, setActiveGame)
      playerLeftRef.set({})
    }
  })
  playerJoinedRef.on('value', (snapshot) => {
    const playerToAdd = snapshot.val()
    if(playerToAdd && playerToAdd.uid){
      const action = "add"
      addOrRemovePlayer(playerToAdd, gameData, action, setActiveGame)
      playerJoinedRef.set({})
    }
  })
}

const initPlayerListenValues = (setActiveGame) => {
  const playersRef = db.ref(`games/active/${activeGameKey}/users`)
  const gameRef = db.ref(`games/active/${activeGameKey}`)
  playersRef.on('value', ()  => {
    gameRef.once('value').then((snapshot) => {
      const gameData = snapshot.val()
      setActiveGame({ ...gameData, gameKey: activeGameKey })
    })
  })
  gameRef.on('value', (snapshot) => {
    if(!snapshot.val()){
      navigate('/')
    }
  })
}

const addOrRemovePlayer = (playerData, gameData, action, setActiveGame) => {
  const playersRef = db.ref(`games/active/${activeGameKey}/users`)
  const players = gameData.users
  if(action === 'remove'){
    const playerIndex = players.findIndex((user) => user.uid === playerData.uid)
    players.splice(playerIndex, 1)
  }
  else{
    players.push(playerData)
  }
  console.log(action)
  setActiveGame({ ...gameData, users: players})
  playersRef.set(players)
}

const deleteGame = (gameKey) => {
  const gameRef = db.ref(`games/active/${gameKey}`);
  gameRef.remove();
};

export {
  createGame,
  getActiveGames,
  getActiveGame,
  joinGame,
  deleteGame,
  leaveGame,
  initOwnerListenValues,
  initPlayerListenValues
};
