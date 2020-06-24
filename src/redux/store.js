// TODO: rename this file to index.js and possibly rename parent folder to 'store'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebaseConfig from './config';

const rrfConfig = {
  userProfile: 'users',
};

firebase.initializeApp(firebaseConfig);

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

export default store;
