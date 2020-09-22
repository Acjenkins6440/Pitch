import { db } from '../firebase';
import { generateBotName, takeBotsTurn } from './AIProvider';
import { userUid } from './UserProvider';
import {
  getDetailedCard,
  updateScorePile,
  getWinningCard,
  calcHandScore,
  getUpdatedScore,
} from './ScoreProvider';

let activeGameKey = '';
let isOwner = false;

const setActiveGameKey = (newKey) => {
  activeGameKey = newKey;
};

const setOwner = (ownerBool) => {
  isOwner = ownerBool;
};

const getOwner = () => isOwner;

const gameExists = () => !!(activeGameKey);

const createGame = (gameProps, userData, setLoading, setError, setActiveGame) => {
  setLoading(true);
  const newGameId = `${userData.uid}${new Date().getTime()}`;
  const gameRef = db.ref(`games/active/${newGameId}`);
  const user = {
    uid: userData.uid,
    displayName: userData.displayName,
    hand: '',
  };
  const gameData = {
    status: 'lobby',
    owner: user,
    users: [user],
    ...gameProps,
    gameKey: newGameId,
  };

  gameRef.set(gameData).then(() => {
    setActiveGameKey(newGameId);
    setOwner(true);
    setActiveGame(gameData);
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

const getActiveGames = () => {
  const gamesRef = db.ref('games/active/');
  gamesRef.once('value').then((snapshot) => {
    const gameObject = snapshot.val();
    const games = [];
    if (gameObject) {
      Object.keys(gameObject).forEach((key) => {
        if(gameObject[key].gameKey) {
          games.push({ ...gameObject[key], key });
        }
      });
    }
    return games;
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
  })
    .catch((error) => { setError(error); });
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
  const endpoint = `games/active/${activeGameKey}`;
  const statusRef = db.ref(`${endpoint}/status`);
  const phaseRef = db.ref(`${endpoint}/phase`);
  const currentBidRef = db.ref(`${endpoint}/currentBid`);
  const playerRef = db.ref(`${endpoint}/users`);
  statusRef.off();
  phaseRef.off();
  currentBidRef.off();
  playerRef.off();
};

const deleteGame = (gameKey) => {
  const gameRef = db.ref(`games/active/${gameKey}`);
  gameRef.remove();
};

const leaveGame = (userData, gameData, setActiveGame, navigate) => {
  detatchUniversalListeners();
  if (!isOwner) {
    detatchPlayerListeners();
    if(activeGameKey){
      const playerLeftRef = db.ref(`games/active/${activeGameKey}/playerLeft`);
      playerLeftRef.set({ uid: userData.uid }).then(() => {
        if (navigate) {
          navigate('/');
        }
      })
    };
  } else {
    detatchOwnerListeners();
    deleteGame(activeGameKey);
  }
  if (setActiveGame) {
    setActiveGame({});
  }
  setActiveGameKey('');
  setOwner(false);
  return null;
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

const getFreshGameData = () => {
  const gameRef = db.ref(`games/active/${activeGameKey}`);
  return gameRef.once('value').then(snapshot => snapshot.val());
};

const getGameLocalPhase = (gameData) => {
  let localPhase = gameData.phase;
  if (gameData.status === 'in progress') {
    const isMyTurn = gameData.playersTurn.uid === userUid();
    const isWaitPhase = gameData.phase === 'bid' || gameData.phase === 'play card';
    if (isWaitPhase && !isMyTurn) {
      localPhase = 'wait';
    }
  }

  return localPhase;
};

const setNextPhase = (gameData) => {
  const phaseRef = db.ref(`games/active/${activeGameKey}/phase`);
  const turnRef = db.ref(`games/active/${activeGameKey}/playersTurn`);
  const dealerRef = db.ref(`games/active/${activeGameKey}/dealer`);
  const statusRef = db.ref(`games/active/${activeGameKey}/status`);

  let nextPlayerIndex = null;
  let nextDealerIndex = null;
  let gameOver = null;
  let newPhase = '';
  let noMoreCards = false;
  switch (gameData.phase) {
    case 'deal':
      newPhase = 'bid';
      break;
    case 'bid':
      newPhase = 'play card';
      break;
    case 'play card':
      if (gameData.inPlay && gameData.inPlay.length === 4) {
        newPhase = 'score throw';
        break;
      } else newPhase = 'play card';
      break;
    case 'score throw':
      noMoreCards = !gameData.users[0].hand;
      newPhase = noMoreCards ? 'score hand' : 'play card';
      break;
    case 'score hand':
      newPhase = 'deal';
      break;
    default:
      break;
  }
  if (newPhase === 'deal') {
    gameOver = gameData.score && (gameData.score.team1 >= 11 || gameData.score.team2 >= 11);
    const dealerIndex = gameData.users.findIndex(user => user.uid === gameData.dealer.uid);
    nextDealerIndex = dealerIndex === 3 ? 0 : dealerIndex + 1;
  }
  if (newPhase === 'play card') {
    const firstThrowOfHand = !gameData.scorePile;
    nextPlayerIndex = firstThrowOfHand
      ? gameData.users.findIndex(user => user.uid === gameData.currentBid.player.uid)
      : gameData.users.findIndex(user => user.uid === gameData.wonLastThrow.uid);
  }
  if (newPhase === 'bid') {
    const dealerIndex = gameData.users.findIndex(user => user.uid === gameData.dealer.uid);
    nextPlayerIndex = 0;
    if (dealerIndex !== 3) {
      nextPlayerIndex = dealerIndex + 1;
    }
  }
  if (newPhase === 'score throw') {
    return setTimeout(() => phaseRef.set(newPhase), 2000);
  }
  return phaseRef.set(newPhase).then(() => {
    if (gameOver) {
      statusRef.set('game over');
      return;
    }
    if (nextPlayerIndex !== null) {
      turnRef.set(gameData.users[nextPlayerIndex]);
    }
    if (nextDealerIndex !== null) {
      dealerRef.set(gameData.users[nextDealerIndex]);
    }
  });
};

const getNextPlayerIndex = (gameData) => {
  let nextPlayerIndex = 0;
  const currPlayerIndex = gameData.users.findIndex(user => user.uid === gameData.playersTurn.uid);
  if (currPlayerIndex !== 3) {
    nextPlayerIndex = currPlayerIndex + 1;
  }
  return nextPlayerIndex;
};

const nextTurn = (gameData) => {
  const turnRef = db.ref(`games/active/${activeGameKey}/playersTurn`);
  if (gameData.phase === 'bid') {
    if (gameData.dealer.uid !== gameData.playersTurn.uid) {
      const nextPlayerIndex = getNextPlayerIndex(gameData);
      turnRef.set(gameData.users[nextPlayerIndex]);
    } else {
      setNextPhase(gameData);
    }
  } else if (gameData.phase === 'play card') {
    const cardCount = gameData.inPlay.length;
    if (cardCount < 4) {
      const nextPlayerIndex = getNextPlayerIndex(gameData);
      turnRef.set(gameData.users[nextPlayerIndex]);
    } else {
      setNextPhase(gameData);
    }
  }
};

const setBid = (bid, gameData) => {
  const bidRef = db.ref(`games/active/${activeGameKey}/currentBid`);
  bidRef.set(bid).then(() => nextTurn({ ...gameData, currentBid: bid }));
};

const shuffleDeck = (deck) => {
  // Fisher Yates shuffle algorithm
  let i = 52;
  const shuffledDeck = deck.slice();
  while (i > 0) {
    i -= 1;
    const ri = Math.floor(Math.random() * (i + 1));
    const temp = shuffledDeck[i];
    shuffledDeck[i] = shuffledDeck[ri];
    shuffledDeck[ri] = temp;
  }
  return shuffledDeck;
};

const deal = (gameData) => {
  const deck = shuffleDeck(gameData.deck);
  const playerRef = db.ref(`games/active/${activeGameKey}/users`);
  gameData.users.forEach((player, index) => {
    const offset = index * 6;
    const begin = offset;
    const end = offset + 6;
    const hand = deck.slice(begin, end).map(card => getDetailedCard(card, player));
    // sort by value, then suit
    hand.sort((a, b) => a.value - b.value);
    hand.sort((a, b) => a.suit.charCodeAt(0) - b.suit.charCodeAt(0));
    Object.assign(player, { ...player, hand });
  });
  playerRef.set(gameData.users);
  setNextPhase(gameData);
};


const playCard = (cardIndex, playerIndex) => {
  const gameRef = db.ref(`games/active/${activeGameKey}`);
  getFreshGameData().then((gameData) => {
    const player = gameData.users[playerIndex];
    const cardPlayed = player.hand.splice(cardIndex, 1)[0];
    if (gameData.inPlay) {
      gameData.inPlay.push(cardPlayed);
    } else {
      Object.assign(gameData, { ...gameData, inPlay: [cardPlayed] });
    }
    if (!gameData.trump) {
      Object.assign(gameData, { ...gameData, trump: cardPlayed.suit });
    }
    return gameRef.set(gameData).then(() => gameData);
  }).then((gameData) => {
    nextTurn(gameData);
  });
  // get fresh data, take card from players hand, and put it in inPlay
  // nextTurn
};

const pass = (gameData) => {
  nextTurn(gameData);
};

const scoreThrow = (gameData) => {
  const gameRef = db.ref(`games/active/${activeGameKey}`);
  const winningCard = getWinningCard(gameData.inPlay, gameData.trump, gameData.inPlay[0].suit);
  const wonLastThrow = winningCard.player;
  const scorePile = updateScorePile(gameData, wonLastThrow.team);
  const updates = { ...gameData, wonLastThrow, scorePile };
  gameRef.set(updates).then(() => {
    setNextPhase(updates);
  });
};

const scoreHand = (gameData) => {
  const gameRef = db.ref(`games/active/${activeGameKey}`);
  const teamScores = calcHandScore(gameData);
  const newScore = getUpdatedScore(gameData.score, teamScores);
  const updates = {
    ...gameData,
    scorePile: [],
    score: newScore,
    trump: '',
    currentBid: { bid: 0, player: gameData.currentBid.player },
  };
  gameRef.set(updates).then(() => {
    setNextPhase(updates);
  });
};

const initUniversalListenValues = (setActiveGame) => {
  const endpoint = `games/active/${activeGameKey}`;
  const statusRef = db.ref(`${endpoint}/status`);
  const phaseRef = db.ref(`${endpoint}/phase`);
  const currentBidRef = db.ref(`${endpoint}/currentBid`);
  const playerRef = db.ref(`${endpoint}/users`);
  const turnRef = db.ref(`${endpoint}/playersTurn`);
  const inPlayRef = db.ref(`${endpoint}/inPlay`);
  const dealerRef = db.ref(`${endpoint}/dealer`);
  [statusRef, currentBidRef, playerRef, turnRef, inPlayRef, dealerRef, phaseRef].forEach((ref) => {
    ref.on('value', () => {
      getFreshGameData().then((gameData) => {
        const localPhase = getGameLocalPhase(gameData);
        const gameWithLocalPhase = { ...gameData, phase: localPhase };
        setActiveGame(gameWithLocalPhase);
      });
    });
  });
};

const initOwnerListenValues = (gameData, setActiveGame) => {
  const endpoint = `games/active/${activeGameKey}`;
  const playerLeftRef = db.ref(`${endpoint}/playerLeft`);
  const playerJoinedRef = db.ref(`${endpoint}/playerJoined`);
  const nextTurnRef = db.ref(`${endpoint}/playersTurn`);
  const phaseRef = db.ref(`${endpoint}/phase`);
  const dealerRef = db.ref(`${endpoint}/dealer`);
  const botTurnArray = [nextTurnRef, dealerRef];

  playerLeftRef.on('value', (snapshot) => {
    const playerToRemove = snapshot.val();
    if (playerToRemove && playerToRemove.uid && activeGameKey) {
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
  phaseRef.on('value', (snapshot) => {
    if (snapshot.exists() && (snapshot.val() === 'score throw' || snapshot.val() === 'score hand')) {
      getFreshGameData().then((gameData) => {
        if (snapshot.val() === 'score throw') {
          scoreThrow(gameData);
        } else { scoreHand(gameData); }
      });
    }
  });
  botTurnArray.forEach((ref) => {
    ref.on('value', (snapshot) => {
      if (snapshot.exists() && snapshot.val().isBot) {
        getFreshGameData().then((gameData) => {
          if (gameData.status === 'in progress') {
            setTimeout(() => takeBotsTurn(gameData, setBid, pass, deal, playCard), 500);
          }
        });
      }
    });
  });
  initUniversalListenValues(setActiveGame);
};

const initPlayerListenValues = (setActiveGame, navigate) => {
  const endpoint = `games/active/${activeGameKey}`;
  const gameRef = db.ref(`${endpoint}`);
  // On game deletion, send back to Lobby
  gameRef.on('value', (snapshot) => {
    if (!snapshot.val()) {
      setActiveGameKey('');
      setActiveGame({});
      navigate('/');
    }
  });
  initUniversalListenValues(setActiveGame);
};

const inProgressGameData = (gameData) => {
  const deck = [];
  const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
  numbers.forEach((number) => {
    deck.push(`${number}H`);
    deck.push(`${number}D`);
    deck.push(`${number}S`);
    deck.push(`${number}C`);
  });
  const botNames = [];
  for (let i = 0; i < 4; i += 1) {
    if (!gameData.users[i]) {
      gameData.users.push({ uid: `bot${i}`, isBot: true, displayName: generateBotName(botNames) });
    }
    const team = (i % 2 === 0) ? 'team1' : 'team2';
    Object.assign(gameData.users[i], { ...gameData.users[i], team });
  }
  return {
    ...gameData,
    status: 'in progress',
    phase: 'deal',
    deck,
    inPlay: [],
    trump: '',
    scorePile: [],
    score: {
      team1: 0,
      team2: 0,
    },
    currentBid: {
      bid: 0,
      player: gameData.users[1],
    },
    playersTurn: {
      uid: '',
      displayname: '',
    },
    playerWonBid: {
      uid: '',
      displayName: '',
    },
    dealer: {
      uid: gameData.owner.uid,
      displayName: gameData.owner.displayName,
    },
  };
};

const startGame = (gameData, setActiveGame) => {
  const gameRef = db.ref(`games/active/${activeGameKey}`);
  const updates = inProgressGameData(gameData);
  gameRef.set(updates);
  gameRef.once('value').then((snapshot) => {
    const activeGame = snapshot.val();
    setActiveGame(activeGame);
  });
};

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
  pass,
  playCard,
};
