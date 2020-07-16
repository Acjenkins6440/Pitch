import firebase from 'firebase/app';
// eslint-disable-next-line import/extensions
import firebaseConfig from './firebaseConfig.js';
import 'firebase/auth';
import 'firebase/firestore';


firebase.initializeApp(firebaseConfig);

export default firebase;
export const auth = firebase.auth();
export const firestore = firebase.firestore();
