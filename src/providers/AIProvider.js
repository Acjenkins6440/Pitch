import { 
  getNonHighPointCard, 
  getJunkCard, 
  getWinningCard, 
  getGamePointValue, 
  getHighTrumpCard 
} from './ScoreProvider'

// const aiKnowledge = {
//   universal: {
//     outOfTrump: [],
//     highGone: false,
//     lowGone: false,
//     jackGone: false,
//     noJack: false,
//     highestTrumpLeft: 'A',
//   }
// }

const botNames = [
  'Janet Jackson',
  'Spiderman',
  'Kevin James',
  'Chance the Rapper',
  'Rap the Chancer',
  'THE Jimmy John',
];

const firstNames = [
  'Jim',
  'John',
  'Kev',
  'Rusty',
  'Jerome',
  'Alex',
  'Phillip',
  'Tori',
  'Dana',
  'Annette',
  'Karen',
  'Mike',
  'Amy',
  'Susan',
  'Some Guy',
  'Some Lady',
  'Carl',
  'Doug',
];

const lastNames = [
  'Brown',
  'Jones',
  'Fredrickson',
  'Appaloosa',
  'Brutananadilewski',
  'Jimmy Johns',
  'Hertzberg',
  'Last Name',
  'Dimmadome',
];

const getRandomArrayElement = array => array[Math.floor(Math.random() * array.length)];

const generateBotName = (currentBotNames) => {
  const firstRoll = Math.floor(Math.random() * 100) <= 15;
  let name = '';
  if (firstRoll) {
    name = `${getRandomArrayElement(botNames)}`;
  } else {
    name = `${getRandomArrayElement(firstNames)} ${getRandomArrayElement(lastNames)}`;
  }
  if (currentBotNames.includes(name)) {
    return generateBotName(currentBotNames);
  }

  currentBotNames.push(name);
  return `${name} (Bot)`;
};



const hasCard = (cards, value) => !!(cards.find(card => card.value === value));

const updateBestSuit = (bestSuit, newSuit, suit) => {
  const morePoints = newSuit.points > bestSuit.points;
  const samePointsMoreCards = newSuit.points === bestSuit.points && newSuit.cards.length > bestSuit.cardLength;
  if (morePoints || samePointsMoreCards) {
    Object.assign(bestSuit, { points: newSuit.points, cardLength: newSuit.cards.length, suit });
  }
};

const calcBid = (hand) => {
  const highBid = { suit: '', bid: 0 };
  const suits = {
    H: { points: 0, cards: [] },
    C: { points: 0, cards: [] },
    D: { points: 0, cards: [] },
    S: { points: 0, cards: [] },
  };
  hand.forEach((card) => {
    suits[card.suit].cards.push(card);
  });
  const bestSuit = {
    points: 0,
    suit: '',
    cardLength: 0,
  };
  /*
  if 1 card in suit, don't bid
  if 2 cards in suit, only bid two if you have ace and something else OR king + queen maybe
  if 3 cards in suit, bid two if:
    1. you have ace + nothing else
    2. you have king + queen/10/jack
    3. you have queen + jack + something else
    4. you have jack + 2 + something else
  bid three if:
    1. you have ace + king/queen/jack/10 + king/queen/jack/10/2
  if 4 cards in suit, bid two if:
    1. you have ace/king + shit else
  bid three if:
    1. you have ace + high card + point card(jack/2/3)
  bid four if:
    1. you have ace + k/q/j/10 + k/q/j/10 + k/q/j/10/2
*/
  Object.keys(suits).forEach((key) => {
    const suit = suits[key];
    if (suit.cards.length > 1) {
      const hasAce = hasCard(suit.cards, 'A');
      const hasKing = hasCard(suit.cards, 'K');
      const hasQueen = hasCard(suit.cards, 'Q');
      const hasJack = hasCard(suit.cards, 'J');
      const hasTwo = hasCard(suit.cards, 2);
      const hasThree = hasCard(suit.cards, 3);
      const hasTen = hasCard(suit.cards, 10);

      let high = '';
      let low = '';

      if (hasAce) {
        high = 'A';
      } else if (hasKing) {
        high = 'K';
      } else if (hasQueen) {
        high = 'Q';
      } else if (hasJack) {
        high = 'J';
      }

      if (hasTwo || hasThree) {
        low = hasTwo ? 2 : 3;
      }
      // 2 cards of suit
      if (suit.cards.length == 2) {
        if (hasAce) {
          suit.points = 2;
        } else if (hasKing && (hasJack || hasQueen)) {
          suit.points = 2;
        }
      }
      // 3 cards of suit
      else if (suit.cards.length === 3) {
        if (hasAce && (hasQueen || hasKing) && (hasJack || !!low)) {
          suit.points = 3;
        } else if (hasJack && low === 2 && (hasAce || hasQueen || hasKing)) {
          suit.points = 3;
        } else if (hasAce && (!hasQueen && !hasKing && !hasJack)) {
          suit.points = 2;
        } else if (hasQueen && hasJack) {
          suit.points = 2;
        } else if (!hasAce && (hasKing || hasQueen) && (hasTen || !!low || hasJack)) {
          suit.points = 2;
        }
      }
      // 4 or more of a suit
      else if (suit.cards.length >= 4) {
        if (hasAce && hasKing && hasJack && low === 2) {
          suit.points = 4;
        } else if (hasAce && (hasQueen || hasKing) && (!!low || hasJack)) {
          suit.points = 3;
        } else if (hasAce && hasQueen && hasKing) {
          suit.points = 3;
        } else if ((hasAce || hasKing) && (!hasQueen && !hasJack && !!low)) {
          suit.points = 2;
        } else if (!hasAce && !hasKing && !hasQueen && !hasJack) {
          suit.points = 2;
        }
      }

      updateBestSuit(bestSuit, suit, key);
    }
  });

  return bestSuit;
};

const chooseLeadCard = (gameData, currBotIndex) => {
  const trump = gameData.trump
  const hand = gameData.user[currBotIndex]
  const teamHasBid = gameData.currentBid.player.team === gameData.user[currBotIndex].team
  if(teamHasBid){
    const highTrump = getHighTrumpCard(hand, trump)
    if(hand.length === 5 || hand.length === 6 && highTrump.value >= 13){
      return highCard
    }
    else{
      return junkCard(hand, trump)
    }
  }  
}
// For choosing bot cards...
// if leading and has high, throw high
// if leading and doesn't have anything good, throw something worth no points
// if following and team member is winning with an ace of trump, throw a point
// if following and team member is winning with J+, throw a trash card
// if following and team member threw a point (2 or jack of trump or 10), try to win that hand
// if following and enemy threw a point, try to win that hand
// if last to throw, and there are no points or trump, throw low OR jack OR a 10 unless you have nothing, then throw nothing
// if following and other team is winning with queen/king/ace of trump, check to see if you can beat it
//    if you can beat it, do it
//    otherwise, throw a trash card
// 
const chooseBotCard = (gameData, currBotIndex) => {
  const bot = gameData.users[currBotIndex]
  if(gameData.inPlay && gameData.inPlay.length){
    const leadingSuit = gameData.inPlay[0].suit
    const lastToThrow = gameData.inPlay.length === 3
    const winningCardSoFar = getWinningCard(gameData.inPlay, gameData.trump, leadingSuit)
    if(lastToThrow){
      if (winningCardSoFar.player.team === bot.team){
        const pointCard = getNonHighPointCard(bot.hand, gameData.trump, leadingSuit)
        if(pointCard.value === 2 
          || pointCard.value === 3 
          || pointCard.value === 10 
          || pointCard.value === 11){
          console.log('we winning and i can get an easy point')
          return pointCard
        }
        else{
          const junkCard = getJunkCard(bot.hand, gameData.trump, leadingSuit)
          console.log('we winning and i have no points')
          return junkCard
        }
      }
      else{
        const trumpPlayed = gameData.inPlay.filter((card) => card.suit === gameData.trump)
        const easyPoint = getNonHighPointCard(bot.hand, gameData.trump, leadingSuit)
        if(!trumpPlayed 
          && easyPoint.suit === gameData.trump 
          && (easyPoint.value === 11 || easyPoint.value === 2 || easyPoint.value === 3)){
          console.log('we not winning yet but imma get this point with trump')
          return easyPoint
        }
        else if(trumpPlayed 
          && easyPoint.suit === gameData.trump
          && (Math.max(...trumpPlayed.map((card) => card.value)) < easyPoint.value)){
            console.log('we not winnin yet but i can beat the next best trump')
            return easyPoint
          }
        else if(easyPoint.suit !== gameData.trump && easyPoint.suit === leadingSuit){
          console.log('we not winning yet but imma get this point without trump')
          return easyPoint
        }
        else{
          console.log('we not winning and all i have is garbage')
          return getJunkCard(bot.hand, gameData.trump, leadingSuit)
        }
      }
    }
    else if(winningCardSoFar.player.team === bot.team){
      const pointCard = getNonHighPointCard(bot.hand, gameData.trump, leadingSuit)
      if (pointCard.value === 2
        || pointCard.value === 3
        || pointCard.value === 10
        || pointCard.value === 11) {
        console.log('we winning and imma grab a point')
        return pointCard
      }
      else {
        const junkCard = getJunkCard(bot.hand, gameData.trump, leadingSuit)
        console.log('we winning but i dont have anything')
        return junkCard
      }
    }
    else if(getGamePointValue(gameData.inPlay) >= 6){
      const highTrump = getHighTrumpCard(bot.hand, gameData.trump)
      if(highTrump){ 
        console.log('gonna snag this quick')
        return highTrump 
      }
      else{
        console.log('i aint got shit')
        return getJunkCard(bot.hand, gameData.trump, leadingSuit)
      }
    }
    else if(getHighTrumpCard(bot.hand, gameData.trump)){
      const highTrumpCard = getHighTrumpCard(bot.hand, gameData.trump)
      if(highTrumpCard.value >= 13){
        console.log('im going for it')
        return highTrumpCard
      }
      else{
        console.log('i got nothing')
        return getJunkCard(bot.hand, gameData.trump, leadingSuit)
      }
    }
    else{
      console.log('no other crit has matched so im throwing garbage')
      return getJunkCard(bot.hand, gameData.trump, leadingSuit)
    }
  }
  else {
    return chooseLeadCard(bot, gameData.trump)
  }
};

const takeBotsTurn = (gameData, setBid, pass, deal, playCard) => {
  const currBotIndex = gameData.users.findIndex(user => user.uid === gameData.playersTurn.uid);
  const hand = gameData.users[currBotIndex].hand

  if (gameData.phase === 'bid') {
    const topBid = calcBid(hand);
    if (topBid.points > gameData.currentBid.bid) {
      const botUser = { ...gameData.playersTurn, hand: null }
      setBid({ bid: topBid.points, player: botUser }, gameData);
    } else {
      pass(gameData);
    }
  } else if (gameData.phase === 'deal') {
    deal();
  } else if (gameData.phase === 'play card') {
    const cardToPlay = chooseBotCard(gameData, currBotIndex);
    const cardIndex = hand.findIndex((card) => card.cardKey === cardToPlay.cardKey)
    console.log(hand)
    console.log(cardToPlay)
    playCard(cardIndex, currBotIndex);
  }
};

/* eslint-disable */ 
export {
  generateBotName,
  takeBotsTurn
};
/* eslint-disable */
