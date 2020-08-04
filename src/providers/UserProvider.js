import firebase, { auth, db } from '../firebase';

// eslint-disable-next-line import/no-named-as-default-member
const googleProvider = new firebase.auth.GoogleAuthProvider();

const createUserData = (user, displayName, setUserData) => {
  const userRef = db.ref(`users/${user.uid}`);
  const name = displayName || user.email || 'anon';
  const userData = {
    preferences: {
      fooFooDealing: 'disabled',
    },
    displayName: name,
    uid: user.uid,
    status: 'online',
    email: user.email || ''
  };

  userRef.set(userData).then(() => {
    if (setUserData) {
      setUserData(userData);
    }
  });
};

const getUserData = (user, setUserData) => {
  db.ref(`users/${user.uid}`).once('value').then((snapshot) => {
    const userData = snapshot.val();
    if (userData && userData.preferences) {
      setUserData(userData);
    } else {
      createUserData(user, null, setUserData);
    }
  });
};

const removeUser = (uid) => {
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
  auth.signInWithPopup(googleProvider).then(() => {
  }).catch((error) => {
    setError(error);
  });
};

const anonymousLogin = (setError) => {
  auth.signInAnonymously().then(() => {
    const user = auth.currentUser;
    createUserData(user)
  }).catch((error) => {
    setError(error);
  });
};

const createUserWithEmail = (email, password, displayName, setError) => {
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      const user = auth.currentUser;
      createUserData(user, displayName);
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
    removeUser(uid);
  } else {
    setOffline(uid);
  }
};

const updateUser = (props, setUserData, user, setError) => {
  const updates = {};
  updates[`/users/${user.uid}`] = props;
  db.ref().update(updates)
    .then(() => {
      getUserData(user, setUserData);
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
  getUserData,
  setOnline,
  setOffline,
};
