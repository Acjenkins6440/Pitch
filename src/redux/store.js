// TODO: rename this file to index.js and possibly rename parent folder to 'store'
import { createStore, combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase/app';
import deck from './deck';
import hands from './hands';
import playerNum from './player';
import 'firebase/auth';
import 'firebase/database';
import firebaseConfig from './config';

const rrfConfig = {
  userProfile: 'users',
};

firebase.initializeApp(firebaseConfig);

const reducer = combineReducers({
  deck,
  hands,
  playerNum,
  firebase: firebaseReducer,
});

const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); // eslint-disable-line

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

export default store;
