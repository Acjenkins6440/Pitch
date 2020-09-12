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

const calcScorePile = (hand) => {

}

const getDetailedCard = (card, player) => {
  const suit = card.slice(-1);
  const value = card.length === 3 ? 10 : card[0];
  const gameValue = getCardGameValue(value);
  const detailedCard = { value, gameValue, suit, cardKey: card }
  if(player){
    detailedCard.player = player
  }
  return detailedCard
}

const cantFollowSuit = (hand, inPlay, isPlayer) => {
  if(isPlayer && inPlay){
    const leadingSuit = inPlay[0].suit
    let hasLeadingSuit = false
    hand.forEach((card) => {
      const cardSuit = card.slice(-1)

      console.log(`leadingSuit: ${leadingSuit}, card: ${card}, cardsuit: ${cardSuit}`)
      if (leadingSuit === cardSuit) {
        hasLeadingSuit = true
      }
    })
    return !hasLeadingSuit
  }
  return false
}

const canPlayCard = (card, gameData, hand, isMyTurn, anySuit) => {
  const cardSuit = card.slice(-1);
  const playable = !gameData.trump
  || gameData.trump === cardSuit
  || gameData.inPlay[0].suit === cardSuit
  || anySuit
  
  if(card.substr(0,2) != 'bl'){
    console.log(`no trump: ${gameData.trump}, card is trump: ${gameData.trump === cardSuit}, following suit: ${gameData.inPlay && gameData.inPlay[0].suit === cardSuit}, don't need to follow suit: ${anySuit}`)
  }

  if (!isMyTurn || gameData.phase != 'play card'){
    return false
  }
  else if(playable){
    return true
  }
}

export {
  getCardGameValue,
  calcScorePile,
  getDetailedCard,
  canPlayCard,
  cantFollowSuit
}