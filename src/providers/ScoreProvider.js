const getCardGameValue = (value) => {
  switch (value) {
    case 10:
      return 10;
    case 'A':
      return 4;
    case 'K':
      return 3;
    case 'Q':
      return 2;
    case 'J':
      return 1;
    default:
      return 0;
  }
};

const getCardValue = (value) => {
  switch (value) {
    case 'J':
      return 11;
    case 'Q':
      return 12;
    case 'K':
      return 13;
    case 'A':
      return 14;
    default:
      return parseInt(value, 10);
  }
};

const getDetailedCard = (card, player) => {
  const suit = card.slice(-1);
  const value = card.length === 3 ? 10 : card[0];
  const gameValue = getCardGameValue(value);
  const playerDetails = { uid: player.uid, displayName: player.displayName, team: player.team };
  return {
    value: getCardValue(value), gameValue, suit, cardKey: card, player: playerDetails,
  };
};

const cantFollowSuit = (hand, inPlay, isPlayer) => {
  if (isPlayer && inPlay) {
    const leadingSuit = inPlay[0].suit;
    let hasLeadingSuit = false;
    hand.forEach((card) => {
      const cardSuit = card.suit;

      if (leadingSuit === cardSuit) {
        hasLeadingSuit = true;
      }
    });
    return !hasLeadingSuit;
  }
  return false;
};

const canPlayCard = (card, gameData, hand, isMyTurn, anySuit) => {
  if (!isMyTurn || gameData.phase !== 'play card') {
    return false;
  }
  const cardSuit = card.suit;
  const playable = anySuit
  || !gameData.inPlay
  || gameData.trump === cardSuit
  || gameData.inPlay[0].suit === cardSuit

  return playable;
};

const needToFollowSuit = (hand, leadingSuit) => (leadingSuit
  ? !!(hand.find(card => card.suit === leadingSuit))
  : false);

const getJunkCard = (hand, trump, leadingSuit) => {
  // need to set rules for setting trump with a junk card,
  //    for times when AI has like, 4 of a suit and no high
  // could probably use botsTrump var from AIProvider
  let junkCard = null;
  const followSuit = needToFollowSuit(hand, leadingSuit);
  if (followSuit) {
    junkCard = hand.find(card => card.suit !== trump
      && card.value < 9
      && card.suit === leadingSuit);
  } else {
    const possibleJunkCards = hand.filter(card => card.suit !== trump && card.value < 9);
    junkCard = possibleJunkCards
  }
  if (!junkCard && !followSuit) {
    junkCard = hand.find(card => card.suit !== trump
      || (card.suit === trump && card.value < 9 && card.value > 4));
  } else if (!junkCard) {
    const allowableNonTrumpCards = hand.filter(card => card.suit === leadingSuit)
    junkCard = allowableNonTrumpCards.length 
    ? allowableNonTrumpCards[Math.floor(Math.random() * allowableNonTrumpCards.length)]
    : null
  } 
  if(!junkCard) {
    junkCard = hand[Math.floor(Math.random() * hand.length)]
  }
  return junkCard;
};

const getNonHighPointCard = (hand, trump, leadingSuit) => {
  // User AIKnowledge here to determine if a 3 could be low
  let pointCard = hand.find(card => card.suit === trump && (card.value === 2 || card.value === 3));
  if (!pointCard) {
    pointCard = hand.find(card => card.suit === trump && card.value === 11);
  }
  if (!pointCard) {
    let maxGameValue = 0;
    if (needToFollowSuit(hand, leadingSuit)) {
      maxGameValue = Math.max(...hand.map(card => card.suit === leadingSuit && card.gameValue));
      pointCard = hand.find(card => card.gameValue === maxGameValue && card.suit === leadingSuit)
    } else {
      maxGameValue = Math.max(...hand.map(card => card.gameValue));
      pointCard = hand.find(card => card.gameValue === maxGameValue );
    }
  }
  return pointCard;
};

const getHighTrumpCard = (hand, trump, botsTrump) => {
  const workingTrump = trump || botsTrump;
  const highestTrumpValue = Math.max(...hand.map(card => card.suit === workingTrump && card.value));
  if (highestTrumpValue <= 3) {
    return null;
  }

  return hand.find(card => card.suit === trump && card.value === highestTrumpValue);
};

const getWinningCard = (inPlay, trump) => {
  const leadingSuit = inPlay[0].suit
  const trumpCards = inPlay.filter(card => card.suit === trump);
  const contenders = (trumpCards.length && trumpCards) || inPlay.filter(card => card.suit === leadingSuit);
  return contenders.reduce((prev, curr) => (prev.value > curr.value ? prev : curr));
};

const getGamePointValue = inPlay => inPlay.reduce((acc, curr) => acc + curr.gameValue, 0);

const updateScorePile = (gameData, winningTeam) => {
  const scorePile =  gameData.scorePile ? [...gameData.scorePile] : []
  const scorePileAddition = gameData.inPlay.splice(0,4).map(card => ({ ...card, team: winningTeam }));
  return scorePile.concat(scorePileAddition)
}

const calcHandScore = (gameData) => {
  const scoreToBeat = gameData.currentBid.bid
  const biddingTeam = gameData.currentBid.player.team
  const handScores = { team1: 0, team2: 0}
  const gamePoints = { team1: 0, team2: 0}
  const trumpCards = gameData.scorePile.filter(card => card.suit === gameData.trump)
  const maxTrumpValue = Math.max(...trumpCards.map(card => card.value))
  const minTrumpValue = Math.min(...trumpCards.map(card => card.value))
  const high = trumpCards.find(card => card.value === maxTrumpValue)
  const low = trumpCards.find(card => card.value === minTrumpValue)
  const jack = trumpCards.find(card => card.value === 11)
  gameData.scorePile.forEach(card => {gamePoints[card.team] += card.gameValue})
  if(gamePoints.team1 > gamePoints.team2){
    handScores['team1'] += 1
  }
  else if(gamePoints.team2 > gamePoints.team1){
    handScores['team2'] += 1
  }
  handScores[high.team] += 1
  handScores[low.team] += 1
  if(jack){
    handScores[jack.team] += 1
  }
  if(handScores[biddingTeam] < scoreToBeat){
    handScores[biddingTeam] = scoreToBeat * -1
  }
  return handScores
}

const mergeScores = (scores1, scores2) => {
  const team1Scores = scores1.team1 ? scores1.team1 : 0
  const team2Scores = scores1.team2 ? scores1.team2 : 0
  return { team1: team1Scores + scores2.team1, team2: team2Scores + scores2.team2}
}

const getUpdatedScore = (oldScore, scoreUpdates) => {
  return oldScore ? mergeScores(oldScore, scoreUpdates) : scoreUpdates
}

export {
  getCardGameValue,
  getDetailedCard,
  cantFollowSuit,
  canPlayCard,
  getWinningCard,
  getNonHighPointCard,
  getJunkCard,
  getGamePointValue,
  getHighTrumpCard,
  getUpdatedScore,
  updateScorePile,
  calcHandScore
};
