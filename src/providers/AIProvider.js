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
  'Anette',
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

const calcBid = (hand) => {
  const sortedHand = hand.slice().sort();
  debugger;
};

const takeBotsTurn = (gameData, setBid, pass) => {
  console.log('big fart');
  const { phase } = gameData;
  const currBotIndex = gameData.users.findIndex(user => user.uid === gameData.playersTurn.uid);
  const { hand } = gameData.users[currBotIndex];

  if (phase === 'bid') {
    const topBid = calcBid(hand);
    if (topBid > gameData.currentBid.bid) {
      // setBid(topBid, gameData);
    } else {
      pass(gameData);
    }
  } else if (phase === 'deal') {

  } else if (phase === 'play card') {

  }
};

/* eslint-disable */ 
export {
  generateBotName,
  takeBotsTurn
};
/* eslint-disable */
