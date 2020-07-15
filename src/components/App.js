import React, { useState } from 'react';
import { Router } from '@reach/router';
import SignIn from './SignIn';
import SignUp from './SignUp';
import PasswordReset from './PasswordReset';
import Board from './Board';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase.js';

const App = () => {
  const [user, loading, error] = useAuthState(auth)
  return (
    user ? 
    <Board playerSeat={0} />
  :
    <Router>
      <SignUp path="signUp" />
      <SignIn path="/" />
      <PasswordReset path="passwordReset" />
    </Router>
  )
};

export default App;
