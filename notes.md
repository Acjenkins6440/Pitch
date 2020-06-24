## Stores

Stores are where all of the state is contained.  The store will be created using a combinedReducer as a prop.
It will not need an initialState argument because that will be handled by inidividual reducers.

## Reducers
Reducers are functions that take actions and perform those actions on the state, always returning a new item, and not modifying the existing state
for instance, a reducer that returns a new object should first make a copy of the object with Object.assign({}, state.object);

```
function deckReducer (state = initialState, action) {
  switch(action.type){
    case "shuffle":
      return shuffleAndReset();
    case "draw":
      return state.deck.slice(0,1);
    case "getCard"
      return getCardFromString(action.cardString);  //questionable...
    default:
      return state;
  }
}
```

## Actions and Action Creators
Action creators are functions that return actions. Actions are simple objects with a 'type' and optional 'payload' prop.
It seems like you pick either one or the other, using action objects or action creators, and creators seems like the way to go, as they are
simple functions and can easily pass payload arguments

```
const drawCard = () => {
  type: "draw"
}
```
or
```
const scorePile = (playerTricks) = {
  type: 'tallyScore',
  playerTricks
}
```