import React, { createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks';
import auth from '../firebase.js';

const [user, loading, error] = useAuthState(auth())

const UserContext = createContext({ user, loading, error });

export default UserContext