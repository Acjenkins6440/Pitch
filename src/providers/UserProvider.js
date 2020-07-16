import firebase, { auth } from '../firebase';

// eslint-disable-next-line import/no-named-as-default-member
const googleProvider = new firebase.auth.GoogleAuthProvider();

const emailLogin = (email, password, setError) => {
  auth.signInWithEmailAndPassword(email, password).catch((error) => {
    setError(error);
  });
};

const googleLogin = (setError) => {
  auth.signInWithPopup(googleProvider).catch((error) => {
    setError(error);
  });
};

const anonymousLogin = (setError) => {
  auth.signInAnonymously().catch((error) => {
    setError(error);
  });
};

const createUserWithEmail = (email, password, displayName, setError) => {
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      const user = auth.currentUser;
      user.updateProfile({
        displayName,
      });
    }).catch((error) => {
      setError(error);
    });
};

const resetPassword = (email, setEmailHasBeenSent, setError) => {
  auth.sendPasswordResetEmail(email).then(() => {
    setEmailHasBeenSent(true);
  }).catch((error) => {
    setError(error);
  });
};

const logout = () => {
  auth.signOut();
};

export {
  emailLogin, googleLogin, anonymousLogin, createUserWithEmail, logout, resetPassword,
};
