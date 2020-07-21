import firebase, { auth, db } from '../firebase';

// eslint-disable-next-line import/no-named-as-default-member
const googleProvider = new firebase.auth.GoogleAuthProvider();

const getUserPreferences = (user, setUserPrefs) => {
  db.ref(`userPrefs/${user.uid}`).once('value').then((snapshot) => {
    const userPrefs = snapshot.val()
    if(userPrefs){ setUserPrefs(userPrefs) }
    else{ createUserPreferences(user, null, setUserPrefs) }
  })
  
};

const createUserPreferences = (user, displayName, setUserPrefs) => {
  const userPrefs = {
    displayName: displayName ? displayName : user.email,
    fooFooDealing: 'disabled'
  }
  db.ref(`userPrefs/${user.uid}`).set(userPrefs).then(() => {
    setUserPrefs(userPrefs)
  })
};

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
      createUserPreferences(user, displayName);
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

const updateUser = (props, setUserPrefs, user) => {
  const updates = {}
  updates[`/userPrefs/${user.uid}`] = props
  console.log(updates)
  db.ref().update(updates).then((response) => {
    console.log(response)
    getUserPreferences(user, setUserPrefs)
  }).catch((error) => {
    console.log(error)
  })

};

export {
  emailLogin, googleLogin, anonymousLogin, createUserWithEmail, logout, resetPassword, updateUser, getUserPreferences
};
