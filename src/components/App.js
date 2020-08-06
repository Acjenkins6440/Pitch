import React, { createContext, useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { auth } from '../firebase';
import SignIn from './SignIn';
import SignUp from './SignUp';
import PasswordReset from './PasswordReset';
import Board from './Board';
import Lobby from './Lobby';
import UserProfile from './UserProfile';
import {
  logout, getUserData, setOnline, setOffline
} from '../providers/UserProvider';
import { leaveGame } from '../providers/GameProvider'

const App = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState({});
  const [lobbyState, setLobbyState] = useState('lobby');
  const [activeGame, setActiveGame] = useState({});

  const UserContext = createContext({ user, loading, error });
  console.log(activeGame)
  useEffect(() => {
    if (!loading && user) {
      getUserData(user, setUserData);
      setOnline(user);
      window.addEventListener('beforeunload', handleDisconnect);
      navigate('/');
    } else if (!user) {
      navigate('/');
    }

    return (() => {
      if (user && !user.isAnonymous) { setOffline(user.uid); }
    });
  }, [loading, user]);

  useEffect(() => {
    if (activeGame && activeGame.status !== 'closed') {
      navigate('/game');
    }
  }, [activeGame]);

  const handleLogout = () => {
    logout(user.uid, user.isAnonymous);
  };

  const handleDisconnect = () => {
    setOffline()
    if(activeGame && activeGame.status) {
      leaveGame(userData, activeGame, setActiveGame, navigate)
    }
  }

  const NavLink = props => (
    <Link
      className="nav-link"
      {...props}
    />
  );

  const lobbyNav = () => {
    setLobbyState('lobby');
    navigate('/');
  };

  const getRightNav = () => {
    if (loading && !user) {
      return (<Nav className="ml-auto" />);
    }

    if (user) {
      return (
        <Nav className="ml-auto">
          <a href="https://bicyclecards.com/how-to-play/pitch/" target="_blank" rel="noreferrer" className="nav-link">Pitch Rules</a>
          <NavLink to="profile">Your Profile</NavLink>
          <Button className="nav-link" style={{ cursor: 'pointer' }} onKeyPress={handleLogout} onClick={handleLogout}>Logout</Button>
        </Nav>
      );
    }

    return (
      <Nav className="ml-auto">
        <a href="https://bicyclecards.com/how-to-play/pitch/" target="_blank" rel="noreferrer" className="nav-link">Pitch Rules</a>
        <NavLink to="/">Sign In</NavLink>
        <NavLink to="signUp">Sign Up</NavLink>
      </Nav>
    );
  };

  const getRouter = () => {
    if (loading) {
      return (
        <Router />
      );
    }
    if (!user) {
      return (
        <Router>
          <SignUp path="signUp" />
          <SignIn path="/" />
          <PasswordReset path="passwordReset" />
        </Router>
      );
    }

    return (
      <Router>
        <UserProfile user={user} path="profile" userData={userData} setUserData={setUserData} />
        <Lobby path="/" userData={userData} lobbyState={lobbyState} setLobbyState={setLobbyState} setActiveGame={setActiveGame} />
        <Board path="/game" gameData={activeGame} />
      </Router>
    );
  };

  return (
    <UserContext.Provider>
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>The most card game</Navbar.Brand>
          <Nav>
            <Button className="nav-link" onClick={lobbyNav} onKeyPress={lobbyNav}>Lobby</Button>
          </Nav>
          {getRightNav()}
        </Navbar>
        {getRouter()}
      </div>
    </UserContext.Provider>
  );
};

export default App;
