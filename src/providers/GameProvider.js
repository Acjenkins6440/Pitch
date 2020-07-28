import firebase, { auth, db } from '../firebase';

const createGame = (user) => {
  const newGameId = `${user.uid}${new Date().getTime()}`
  const gameRef = db.ref(`games/active/${newGameId}`);
  const gameData = {
    status: 'lobby',
    users: {
      owner: user.uid
    }
  }
}