import React, { createContext } from 'react';
import { Router, Link } from '@reach/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { auth } from '../firebase';
import SignIn from './SignIn';
import SignUp from './SignUp';
import PasswordReset from './PasswordReset';
import Board from './Board';
import UserProfile from './UserProfile';
import { logout } from '../providers/UserProvider';

const App = () => {
  const [user, loading, error] = useAuthState(auth);

  const UserContext = createContext({ user, loading, error });

  const NavLink = props => (
    <Link
      className="nav-link"
      {...props}
    />
  );

  const getNav = () => {
    if (user) {
      return (
        <Nav className="ml-auto">
          <NavLink to="profile">Your Profile</NavLink>
          <Button className="nav-link" style={{ cursor: 'pointer' }} onKeyPress={logout} onClick={logout}>Logout</Button>
        </Nav>
      );
    }

    return (
      <Nav className="ml-auto">
        <NavLink to="/">Sign In</NavLink>
        <NavLink to="signUp">Sign Up</NavLink>
      </Nav>
    );
  };

  return (
    <UserContext.Provider>
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>The most card game</Navbar.Brand>
          {getNav()}
        </Navbar>
        {user
          ? (
            <Router>
              <UserProfile error={error} user={user} path="profile" />
              <Board path="/" playerSeat={0} />
            </Router>
          )
          : (
            <Router>
              <SignUp path="signUp" />
              <SignIn path="/" />
              <PasswordReset path="passwordReset" />
            </Router>
          )
        }
      </div>
    </UserContext.Provider>
  );
};

export default App;
