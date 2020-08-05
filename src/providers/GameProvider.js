import { db } from '../firebase';

const createGame = (gameProps, userData, setLoading, setError, setActiveGame) => {
  setLoading(true);
  const newGameId = `${userData.uid}${new Date().getTime()}`;
  const gameRef = db.ref(`games/active/${newGameId}`);
  const user = {
    uid: userData.uid,
    displayName: userData.displayName
  }
  const gameData = {
    status: 'lobby',
    owner: user,
    users: [user],
    ...gameProps,
  };
  gameRef.set(gameData).then(() => {
    setActiveGame(gameData)
    setLoading(false);
  }).catch((error) => {
    setError(error);
    setLoading(false)
  });
};

const getActiveGames = (setActiveGames) => {
  const gamesRef = db.ref('games/active/');
  gamesRef.once('value').then((snapshot) => {
    const games = snapshot.val();
    setActiveGames(games);
  });
};

const joinGame = (userData, gameData, gameKey, setActiveGame, navigate) => {
  const gameRef = db.ref(`games/active/${gameKey}`)
  console.log(gameData)
  gameData.players.push({
    uid: userData.uid,
    displayName: userData.displayName
  })
};

const deleteGame = (gameKey) => {
  const gameRef = db.ref(`games/active/${gameKey}`)
  gameRef.remove()
}

export {
  createGame,
  getActiveGames,
  joinGame,
  deleteGame
};
