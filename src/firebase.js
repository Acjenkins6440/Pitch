import firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig.js';
import 'firebase/auth';
import 'firebase/database';


firebase.initializeApp(firebaseConfig);

export default firebase;
export const auth = firebase.auth();
export const db = firebase.database();
