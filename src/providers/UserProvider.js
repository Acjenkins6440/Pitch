import firebase, { auth, db } from '../firebase';

// eslint-disable-next-line import/no-named-as-default-member
const googleProvider = new firebase.auth.GoogleAuthProvider();

const createUserPreferences = (user, displayName, setUserPrefs) => {
  const userPrefs = {
    displayName: (displayName) || user.email,
    fooFooDealing: 'disabled',
  };
  db.ref(`users/${user.uid}/preferences`).set(userPrefs).then(() => {
    setUserPrefs(userPrefs);
  });
};

const getUserPreferences = (user, setUserPrefs) => {
  db.ref(`users/${user.uid}/preferences`).once('value').then((snapshot) => {
    const userPrefs = snapshot.val();
    if (userPrefs) {
      setUserPrefs(userPrefs);
    } else {
      createUserPreferences(user, null, setUserPrefs);
    }
  });
};

const removeUserPrefs = (uid) => {
  db.ref(`users/${uid}`).remove();
};

const setOnline = (user) => {
  db.ref(`users/${user.uid}/status`).set('online');
};

const setOffline = (uid) => {
  if (typeof uid !== 'string') {
    const user = auth.currentUser;
    db.ref(`users/${user.uid}/status`).set('offline');
  }
  db.ref(`users/${uid}/status`).set('offline');
};

const emailLogin = (email, password, setError) => {
  auth.signInWithEmailAndPassword(email, password).then(() => {

  }).catch((error) => {
    setError(error);
  });
};

const googleLogin = (setError) => {
  auth.signInWithPopup(googleProvider).catch((error) => {
    setError(error);
  });
};

const anonymousLogin = (setError) => {
  auth.signInAnonymously().then(() => {
  }).catch((error) => {
    setError(error);
  });
};

const createUserWithEmail = (email, password, displayName, setError) => {
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      const user = auth.currentUser;
      createUserPreferences(user, displayName);
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

const logout = (uid, anon) => {
  window.removeEventListener('beforeunload', setOffline);
  auth.signOut();
  if (anon) {
    removeUserPrefs(uid);
  } else {
    setOffline(uid);
  }
};

const updateUser = (props, setUserPrefs, user, setError) => {
  const updates = {};
  updates[`/users/${user.uid}/preferences`] = props;
  db.ref().update(updates).then(() => {
    getUserPreferences(user, setUserPrefs);
  }).catch((error) => {
    setError(error);
  });
};

export {
  emailLogin,
  googleLogin,
  anonymousLogin,
  createUserWithEmail,
  logout,
  resetPassword,
  updateUser,
  getUserPreferences,
  setOnline,
  setOffline,
};
