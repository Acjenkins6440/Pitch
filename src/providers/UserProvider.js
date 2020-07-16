import firebase from '../firebase.js';

const googleProvider = new firebase.auth.GoogleAuthProvider();

const emailLogin = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password);
};

const googleLogin = () => {
  firebase.auth().signInWithPopup(googleProvider).then((result) => {
    const token = result.credential.accessToken;
    const { user } = result;
  }).catch((error) => {
    console.log(error);
    return error;
  });
};

const anonymousLogin = () => {
  firebase.auth().signInAnonymously().catch((error) => {
    console.log(error);
    return (error);
  });
};

const createUserWithEmail = (email, password, displayName) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      const user = firebase.auth().currentUser;
      user.updateProfile({
        displayName,
      });
    }).catch((error) => {
      console.log(error);
      return error;
    });
};

const resetPassword = (email) => {
  firebase.auth().sendPasswordResetEmail(email).then(result => result).catch(error => error);
};

const logout = () => {
  auth().signOut();
};

export {
  emailLogin, googleLogin, anonymousLogin, createUserWithEmail, logout, resetPassword,
};
