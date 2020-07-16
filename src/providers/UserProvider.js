import firebase from '../firebase.js';

const googleProvider = new firebase.auth.GoogleAuthProvider();

const emailLogin = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password);
};

const googleLogin = (setError) => {
  firebase.auth().signInWithPopup(googleProvider).catch((error) => {
    setError(error);
  });
};

const anonymousLogin = (setError) => {
  firebase.auth().signInAnonymously().catch((error) => {
    setError(error);
  });
};

const createUserWithEmail = (email, password, displayName, setError) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      const user = firebase.auth().currentUser;
      user.updateProfile({
        displayName,
      });
    }).catch((error) => {
      setError(error);
    });
};

const resetPassword = (email, setEmailHasBeenSent, setError) => {
  firebase.auth().sendPasswordResetEmail(email).then(() => {
    setEmailHasBeenSent(true);
  }).catch((error) => {
    setError(error);
  });
};

const logout = () => {
  firebase.auth().signOut();
};

export {
  emailLogin, googleLogin, anonymousLogin, createUserWithEmail, logout, resetPassword,
};
