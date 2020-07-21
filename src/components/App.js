import React, { createContext, useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
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
import { logout, getUserPreferences } from '../providers/UserProvider';

const App = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userPrefs, setUserPrefs] = useState(null);
  
  useEffect(() => {
    if(!loading && user){
      getUserPreferences(user, setUserPrefs);
    }
    else if(!user){
      navigate('/')
    }
  }, [loading])

  const UserContext = createContext({ user, loading, error });

  const NavLink = props => (
    <Link
      className="nav-link"
      {...props}
    />
  );

  const getRightNav = () => {
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
          <Nav>
            <NavLink to="/">Lobby</NavLink>
          </Nav>
          {getRightNav()}
        </Navbar>
        {user
          ? (
            <Router>
              <UserProfile error={error} user={user} path="profile" userPrefs={userPrefs} setUserPrefs={setUserPrefs}/>
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
