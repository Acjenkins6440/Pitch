import React, { createContext } from 'react';
import { Router } from '@reach/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import SignIn from './SignIn';
import SignUp from './SignUp';
import PasswordReset from './PasswordReset';
import Board from './Board';

const App = () => {
  const [user, loading, error] = useAuthState(auth);

  const UserContext = createContext({ user, loading, error });

  return (
    <UserContext.Provider>
      {user
        ? <Board playerSeat={0} />
        : (
          <Router>
            <SignUp path="signUp" />
            <SignIn path="/" />
            <PasswordReset path="passwordReset" />
          </Router>
        )
        }
    </UserContext.Provider>
  );
};

export default App;
