import React, { useState } from "react";
import { Link } from "@reach/router";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "resetEmail") {
      setEmail(value);
    }
  };
  const sendReset = (event) => {
    event.preventDefault();
  };

  return (
    <div className="sign-in-container">
      <h1 className="center">Reset Your Password</h1>
      <br />
      <div className="sign-in-form-container">
        <Form className="sign-in-form-container" onSubmit={(e) => e.preventDefault()}>
          { emailHasBeenSent ? 
            (<p>An email containing a reset link has been sent!</p>) 
            : ''
          } 
          { error ? 
            (<p className="error">{error}</p>) 
            : ''
          }
          <Form.Group controlId="resetEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control onChange={onChange} name="resetEmail" value={email} type="email" placeholder="E.g:RustyShackleford@gmail.com" />
            <br />
            <div className="center">
              <Button className="sign-in-button" type="submit">Send reset link</Button>
            </div>
          </Form.Group>
        </Form>
        
        <Link to="/" className="sign-in-button">Back to Sign In</Link>

      </div>
    </div>
  )

}

export default PasswordReset