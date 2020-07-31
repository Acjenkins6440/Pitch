import firebase, { auth, db } from '../firebase';

const createGame = (gameProps, userData, setLoading, setError) => {
  setLoading(true)
  const newGameId = `${userData.uid}${new Date().getTime()}`
  const gameRef = db.ref(`games/active/${newGameId}`);
  const gameData = {
    status: 'lobby',
    users: {
      owner: userData.uid
    },
    ...gameProps
  }
  gameRef.set(gameData).then(() => {
    setLoading(false)
  }).catch((error) => {
    setError(error)
  })
}

const getActiveGames = (setActiveGames) => {
  const gamesRef = db.ref('games/active/');
  gamesRef.once('value').then((snapshot) => {
    const games = snapshot.val();
    setActiveGames(games)
  })
}

export {
  createGame,
  getActiveGames,
}