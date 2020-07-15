import firebase from '../firebase.js';

const googleProvider = new firebase.auth.GoogleAuthProvider();

const emailLogin = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password);
}

const googleLogin = () => {
  firebase.auth().signInWithPopup(googleProvider).then((result) => {
    const token = result.credential.accessToken;
    var user = result.user;
  }).catch((error) => {
    console.log(error);
    return error;
  })
}

const anonymousLogin = () => {
  firebase.auth().signInAnonymously().catch((error) => {
    console.log(error)
    return(error)
  })
}

const createUserWithEmail = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((result) => {
    return result
  }).catch((error) => {
    console.log(error);
    return error;
  })
}

const logout = () => {
  auth().signOut();
}

export { emailLogin, googleLogin, anonymousLogin, createUserWithEmail, logout }