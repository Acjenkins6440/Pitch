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
      console.log(error);
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

const updateUser = (props) => {
  const user = auth.currentUser;
  console.log(props)
  console.log(...props)
  user.updateProfile({
    ...props,
  }).catch((error) => {
    setError(error);
  });
};

export {
  emailLogin, googleLogin, anonymousLogin, createUserWithEmail, logout, resetPassword, updateUser,
};
