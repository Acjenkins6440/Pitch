import React, { useState } from 'react';
import { Link } from '@reach/router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const emailPassSignInHandler = (event, email, password) => {
    event.preventDefault();
  };

  const onChange = (event) => {
    const { name, value } = event.currentTarget; 

    if(name === 'email') {
      setEmail(value);
    }

    else if(name === 'password') {
      setPassword(value)
    }
  };

  return (
    <div className="sign-in-container">
      <h1 className="center">Sign In</h1>
      <br />
      <div className="sign-in-form-container">
        <Form className="sign-in-form" onSubmit={(e) => e.preventDefault()} >
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control onChange={onChange} name="email" value={email} type="email" placeholder="E.g: RustyShackleford@gmail.com" />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control onChange={onChange} name="password" value={password} type="password" placeholder="Password" />
          </Form.Group>
          <br />
          <div className="center">
            <Button className="sign-in-button" type="submit">Sign In</Button>
          </div>
        </Form>
        <div className="hr-holder">
          <hr />
        </div>
        <button className="google-sign-in btn btn-primary"></button>
        <div className="hr-holder">
          <hr />
        </div>
        Do you need an account? <Link to="/signUp" className="sign-in-button">Sign up here!</Link>
        <br />
        <Link to="passwordReset" className="sign-in-button">Forgot Password?</Link>
      </div>
    </div>
  )
}

export default SignIn