import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';
import { createGame } from '../providers/GameProvider';

const CreateGame = ({ userData, backToLobby, setActiveGame }) => {
  const [name, setName] = useState(`${userData.displayName}'s game`);
  const [botsEnabled, setBotsEnabled] = useState(true);
  const [passwordEnabled, setPasswordEnabled] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const onChange = (event) => {
    const { name, value } = event.currentTarget;
    if (name === 'name') {
      setName(value);
    } else if (name === 'bots') {
      setBotsEnabled(!botsEnabled);
    } else if (name === 'passwordEnable') {
      setPasswordEnabled(!passwordEnabled);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const gameProps = {
      name,
      botsEnabled,
      passwordEnabled,
      password,
    };
    createGame(gameProps, userData, setLoading, setError, setActiveGame);
  };

  return (
    <div className="generic-container create-container">
      <h1 className="center">Create a New Game</h1>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="gameName">
          <Form.Label>Game Title</Form.Label>
          <Form.Control
            onChange={onChange}
            name="name"
            value={name}
            type="text"
            required
          />
        </Form.Group>
        <Form.Group controlId="botsEnabled">
          <Form.Label>Enable Bots?</Form.Label>
          <Form.Check type="checkbox" name="bots" onChange={onChange} checked={botsEnabled} />
        </Form.Group>
        <Form.Group controlId="passwordEnabled">
          <Form.Label>Enable Password?</Form.Label>
          <Form.Check type="checkbox" name="passwordEnable" onChange={onChange} />
        </Form.Group>
        {passwordEnabled
          ? (
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={onChange}
                name="password"
                value={password}
                type="text"
                required
              />
            </Form.Group>
          )
          : <div className="form-placeholder" />
        }
        <div className="center">
          <Button type="submit">
            Create Game
            {loading
              ? <Spinner animation="border" />
              : ''}
          </Button>
          <Button name="lobby" onClick={backToLobby} onKeyPress={backToLobby} variant="secondary">Back to Lobby</Button>
        </div>
      </Form>
      <div className="center">
        { error || ''}
      </div>
    </div>
  );
};

CreateGame.propTypes = {
  userData: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
  }).isRequired,
  backToLobby: PropTypes.func.isRequired,
  setActiveGame: PropTypes.func.isRequired,
};

export default CreateGame;
