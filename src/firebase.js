import firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();