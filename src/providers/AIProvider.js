import { deal, playCard, pickTrump } from './GameProvider'

const botNames = [
  'Janet Jackson',
  'Spiderman',
  'Kevin James',
  'Chance the Rapper',
  'Rap the Chancer',
  'THE Jimmy John',
]

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
  'Doug'
]

const lastNames = [
  'Brown',
  'Jones',
  'Fredrickson',
  'Appaloosa',
  'Brutananadilewski',
  'Jimmy Johns',
  'Hertzberg',
  'Last Name',
  'Dimmadome'
]

const getRandomArrayElement = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

const generateBotName = (currentBotNames) => {
  const firstRoll = Math.floor(Math.random() * 100) <= 15
  let name = ""
  if(firstRoll){
    name = `${getRandomArrayElement(botNames)}`
  }
  else{
    name = `${getRandomArrayElement(firstNames)} ${getRandomArrayElement(lastNames)}`
  }
  if(currentBotNames.includes(name)){
    return generateBotName(currentBotNames)
  }
  else{
    currentBotNames.push(name)
    return name + ' (Bot)'
  }
}

export {
  generateBotName
}