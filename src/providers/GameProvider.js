import { db } from '../firebase';

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
    setActiveGame({ ...gameData, gameKey: newGameId });
    setLoading(false);
  }).catch((error) => {
    setError(error);
    setLoading(false);
  });
};

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
  const gameRef = db.ref(`games/active/${gameKey}`);
  const playersRef = db.ref(`games/active/${gameKey}/users`)
  gameRef.once('value').then((snapshot) => {
    const gameData = snapshot.val();
    const players = gameData.users
    const error = {
      code: '',
      message: ''
    }
    if(players.length < 4 && gameData.status == 'lobby'){
      return gameData
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
  }).then((gameData) => {
    console.log(gameData)
    const players = gameData.users
    players[players.length] = {
      uid: userData.uid,
      displayName: userData.displayName
    }
    playersRef.set(players)
    return (gameData)
  }).then((gameData) => {
    setActiveGame({ ...gameData, gameKey })
    navigate('/')
  }).catch((error) => {setError(error)})
};

const leaveGame = (userData, gameKey, setActiveGame, navigate) => {
  const gameRef = db.ref(`games/active/${gameKey}`);
  const playersRef = db.ref(`games/active/${gameKey}/users`)
  gameRef.once('value').then((snapshot) => {
    const gameData = snapshot.val();
    const players = gameData.users
    const index = gameData.users.indexOf({ uid: userData.uid, displayName: userData.displayName })
    players[index] = {uid: null, displayName: 'Some bot'}
  }).then(() => {
    playersRef.set(players)
  })
}

const deleteGame = (gameKey) => {
  const gameRef = db.ref(`games/active/${gameKey}`);
  gameRef.remove();
};

export {
  createGame,
  getActiveGames,
  joinGame,
  deleteGame,
  leaveGame
};
