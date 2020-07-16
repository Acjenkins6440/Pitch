/* eslint-disable import/extensions */
import firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig.js';
import 'firebase/auth';
import 'firebase/firestore';


firebase.initializeApp(firebaseConfig);

export default firebase;
export const auth = firebase.auth();
export const firestore = firebase.firestore();
