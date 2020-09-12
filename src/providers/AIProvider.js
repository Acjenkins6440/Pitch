import { getCardGameValue, calcScorePile, getDetailedCard } from './ScoreProvider'

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
    const detailedCard = getDetailedCard(card)
    suits[detailedCard.suit].cards.push(detailedCard);
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
}

const chooseBotCard = (gameData) => {
  if(gameData.inPlay && gameData.inPlay.length){
    const suitThatLead = gameData.inPlay[0].suit
  }
  else {
    const suitToLead = chooseLeadCard()
  }
};

const takeBotsTurn = (gameData, setBid, pass, deal, playCard) => {
  const { phase } = gameData;
  const currBotIndex = gameData.users.findIndex(user => user.uid === gameData.playersTurn.uid);
  const { hand } = gameData.users[currBotIndex];

  if (phase === 'bid') {
    const topBid = calcBid(hand);
    if (topBid.points > gameData.currentBid.bid) {
      const botUser = { ...gameData.playersTurn, hand: null }
      setBid({ bid: topBid.points, player: botUser }, gameData);
    } else {
      pass(gameData);
    }
  } else if (phase === 'deal') {
    deal();
  } else if (phase === 'play card') {
    const cardToPlay = chooseBotCard(gameData, currBotIndex);
    playCard(cardToPlay);
  }
};

/* eslint-disable */ 
export {
  generateBotName,
  takeBotsTurn
};
/* eslint-disable */
