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
    return 11
  case 'Q':
    return 12
  case 'K':
    return 13
  case 'A':
    return 14
  default: 
    return parseInt(value)
  }
}

const calcScorePile = (hand) => {

}

const getDetailedCard = (card, player) => {
  const suit = card.slice(-1);
  const value = card.length === 3 ? 10 : card[0];
  const gameValue = getCardGameValue(value);
  const playerDetails = { uid: player.uid, displayName: player.displayName, team: player.team }
  return { value: getCardValue(value), gameValue, suit, cardKey: card, player: playerDetails }
}

const cantFollowSuit = (hand, inPlay, isPlayer) => {
  if(isPlayer && inPlay){
    const leadingSuit = inPlay[0].suit
    let hasLeadingSuit = false
    hand.forEach((card) => {
      const cardSuit = card.suit

      if (leadingSuit === cardSuit) {
        hasLeadingSuit = true
      }
    })
    return !hasLeadingSuit
  }
  return false
}

const canPlayCard = (card, gameData, hand, isMyTurn, anySuit) => {
  if (!isMyTurn || gameData.phase != 'play card') {
    return false
  }
  const cardSuit = card.suit;
  const playable = !gameData.trump
  || gameData.trump === cardSuit
  || gameData.inPlay[0].suit === cardSuit
  || anySuit

  return playable
}

const needToFollowSuit = (hand, leadingSuit) => {
  return leadingSuit ? !!(hand.find((card) => card.suit === leadingSuit)) : false
}

const getJunkCard = (hand, trump, leadingSuit) => {
  let junkCard = null
  const followSuit = needToFollowSuit(hand, leadingSuit)
  console.log(`junk leadingSuit: ${leadingSuit}, followSuit: ${followSuit}`)
  if(followSuit){
    junkCard = hand.find((card) => card.suit !== trump && card.value < 9 && card.suit === leadingSuit)
  }
  else{
    junkCard = hand.find((card) => card.suit !== trump && card.value < 9)
  }
  if(!junkCard && !followSuit){
    junkCard = hand.find((card) => card.suit !== trump || (card.suit === trump && card.value < 9 && card.value > 4))
  }
  else if(!junkCard){
    junkCard = hand.find((card) => card.suit === leadingSuit)
  }
  else{
    junkCard = hand[0]
  }
  return junkCard
}

const getNonHighPointCard = (hand, trump, leadingSuit) => {
  //User AIKnowledge here to determine if a 3 could be low
  let pointCard = hand.find((card) => card.suit === trump && (card.value === 2 || card.value === 3))
  if(!pointCard) {
    pointCard = hand.find((card) => card.suit === trump && card.value === 11)
  }
  if(!pointCard){
    let maxGameValue = 0
    if(needToFollowSuit(hand, leadingSuit)){
      maxGameValue = Math.max(...hand.map((card) => card.suit === leadingSuit && card.gameValue))
    }
    else {
      maxGameValue = Math.max(...hand.map((card) => card.gameValue))
    }
    pointCard = hand.find((card) => card.gameValue === maxGameValue)
  }
  return pointCard
}

const getHighTrumpCard = (hand, trump) => {
  let highestTrumpValue = Math.max(...hand.map((card) => card.suit === trump && card.value))
  if(highestTrumpValue <= 3){
    return null
  }
  else{
    return hand.find((card) => card.suit === trump && card.value === highestTrumpValue)
  }
}

const getWinningCard = (inPlay, trump, leadingSuit) => {
  const trumpCards = inPlay.filter((card) => card.suit === trump)
  const contenders = trumpCards ? trumpCards : inPlay.filter((card) => card.suit === leadingSuit)
  return contenders.reduce((prev, curr) => prev.value > curr.value ? prev : curr)
}

const getGamePointValue = (inPlay) => {
  return inPlay.reduce((acc, curr) => acc += curr.gameValue, 0)
}

export {
  getCardGameValue,
  calcScorePile,
  getDetailedCard,
  cantFollowSuit,
  canPlayCard,
  getWinningCard,
  getNonHighPointCard,
  getJunkCard,
  getGamePointValue,
  getHighTrumpCard
}