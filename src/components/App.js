import React, { createContext, useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Nav } from 'react-bootstrap';
import { auth } from '../firebase';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import SignIn from './SignIn';
import SignUp from './SignUp';
import PasswordReset from './PasswordReset';
import Board from './Board';
import Lobby from './Lobby';
import UserProfile from './UserProfile';
import { logout, getUserPreferences, setOnline, setOffline } from '../providers/UserProvider';

const App = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userPrefs, setUserPrefs] = useState(null);
  const UserContext = createContext({ user, loading, error });

  useEffect(() => {
    if (!loading && user) {
      getUserPreferences(user, setUserPrefs);
      setOnline(user);
      window.addEventListener('beforeunload', setOffline)
    } else if (!user) {
      navigate('/');
    }

    return(() => {
      if (user && !user.isAnonymous) { setOffline(user.uid) }
    })
  }, [loading, user]);

  const handleLogout = () => {
    logout(user.uid, user.isAnonymous)
  }

  const NavLink = props => (
    <Link
      className="nav-link"
      {...props}
    />
  );

  const getRightNav = () => {
    if(loading && !user) {
      return (<Nav className="ml-auto" />)
    }
    
    else if (user) {
      return (
        <Nav className="ml-auto">
          <NavLink to="profile">Your Profile</NavLink>
          <Button className="nav-link" style={{ cursor: 'pointer' }} onKeyPress={handleLogout} onClick={handleLogout}>Logout</Button>
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

  const getRouter = () => {
    if(loading) {
      return(
        <Router>
        </Router>
      )
    }
    else if(!user){
      return(
        <Router>
          <SignUp path="signUp" />
          <SignIn path="/" />
          <PasswordReset path="passwordReset" />
        </Router>
      )
    }
    else {
      return(
        <Router>
          <UserProfile user={user} path="profile" userPrefs={userPrefs} setUserPrefs={setUserPrefs} />
          <Lobby path="/" />
          <Board path="/game" playerSeat={0} />
        </Router>
      )
    }
  }

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
        {getRouter()}
      </div>
    </UserContext.Provider>
  );
};

export default App;
