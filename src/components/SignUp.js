import React, { useState } from 'react';
import { Link, navigate } from '@reach/router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { googleLogin, createUserWithEmail } from '../providers/UserProvider';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState(null);

  const onChange = (event) => {
    const { name, value } = event.currentTarget;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else {
      setDisplayName(value);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (event.target.id === 'google') {
      googleLogin(setError);
    } else {
      createUserWithEmail(email, password, displayName, setError);
      setEmail('');
      setPassword('');
      setDisplayName('');
      if (!error) {
        navigate('/');
      }
    }
  };

  return (
    <div className="sign-in-container">
      <h1 className="center">Sign Up</h1>
      <br />
      <div className="sign-in-form-container">
        <Form className="sign-in-form" onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control required onChange={onChange} name="email" value={email} type="email" placeholder="E.g: RustyShackleford@gmail.com" />
          </Form.Group>
          <Form.Group controlId="displayName">
            <Form.Label>Display name:</Form.Label>
            <Form.Control required onChange={onChange} name="displayName" value={displayName} type="text" placeholder="E.g: Team Ambien" />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control required onChange={onChange} name="password" value={password} type="password" placeholder="Password" />
          </Form.Group>
          <br />
          <div className="center">
            {error
              ? (<p className="error">{`${error.code}: ${error.message}`}</p>)
              : ''
            }
            <Button className="sign-in-button" type="submit">Sign Up</Button>
          </div>
        </Form>
        <div className="hr-holder">
          <hr />
        </div>
        <button type="submit" id="google" className="google-sign-in btn btn-primary" onClick={submitHandler} />
        <div className="hr-holder">
          <hr />
        </div>
        Have an account already?
        {' '}
        <Link to="/" className="sign-in-button">Sign in here!</Link>
        <br />
        <Link to="/passwordReset" className="sign-in-button">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default SignUp;
