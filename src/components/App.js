import React, { createContext, useState, useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { auth } from '../firebase';
import SignIn from './SignIn';
import SignUp from './SignUp';
import PasswordReset from './PasswordReset';
import Board from './Board';
import Lobby from './Lobby';
import UserProfile from './UserProfile';
import FriendsList from './FriendsList';
import {
  logout, getUserPreferences, setOnline, setOffline,
} from '../providers/UserProvider';

const App = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userPrefs, setUserPrefs] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const UserContext = createContext({ user, loading, error });

  useEffect(() => {
    if (!loading && user) {
      getUserPreferences(user, setUserPrefs);
      setOnline(user);
      window.addEventListener('beforeunload', setOffline);
    } else if (!user) {
      navigate('/');
    }

    return (() => {
      if (user && !user.isAnonymous) { setOffline(user.uid); }
    });
  }, [loading, user]);

  const handleLogout = () => {
    logout(user.uid, user.isAnonymous);
  };

  const friendNotifications = () => false;

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const onChange = (event) => {
    const { value } = event.currentTarget;
    setFriendInvite(value)
  }

  const onSubmit = (event) => {
    event.preventDefault();
  }

  const NavLink = props => (
    <Link
      className="nav-link"
      {...props}
    />
  );

  const getRightNav = () => {
    if (loading && !user) {
      return (<Nav className="ml-auto" />);
    }

    if (user) {
      return (
        <Nav className="ml-auto">
          <a href="https://bicyclecards.com/how-to-play/pitch/" target="_blank" rel="noreferrer" className="nav-link">Pitch Rules</a>
          <Button className={`nav-link ${friendNotifications() ? 'notification' : ''}`} style={{ cursor: 'pointer' }} onClick={toggleModal}>Friends</Button>
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
        <UserProfile user={user} path="profile" userPrefs={userPrefs} setUserPrefs={setUserPrefs} />
        <Lobby path="/" />
        <Board path="/game" playerSeat={0} />
      </Router>
    );
  };

  const getModal = () => (
    <Modal show={modalOpen} onHide={toggleModal}>
      <Modal.Header closeButton>
        <h1>Your Friends</h1>
      </Modal.Header>
      <Modal.Body>
        <FriendsList />
      </Modal.Body>
      <Modal.Footer>
        <span>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="friendInvite">
              <Form.Control required onChange={handleFriendInvite} type="text" placeholder="Player to invite"></Form.Control>
              <Button variant="primary" type="submit">Send Invite</Button>
            </Form.Group>
          </Form>
        </span>
        <Button variant="secondary" onClick={toggleModal} onKeyPress={toggleModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );

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
        {getModal()}
        {getRouter()}
      </div>
    </UserContext.Provider>
  );
};

export default App;
