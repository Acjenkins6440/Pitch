// TODO: rename this file to index.js and possibly rename parent folder to 'store'
import { createStore, combineReducers } from 'redux';
import deck from './deck';
import hands from './hands';
import playerNum from './player';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {};

const rrfConfig = {
  userProfile: 'users'
};

firebase.initializeApp(firebaseConfig);
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig)
)(createStore);

const reducer = combineReducers({
  deck,
  hands,
  playerNum,
  firebase: 'firebaseReducer'
});

const store = createStorWeWithFirebase(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); // eslint-disable-line no-underscore-dangle


export default store;
