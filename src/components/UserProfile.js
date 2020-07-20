import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { updateUser } from '../providers/UserProvider';

const UserProfile = ({ user, error }) => {
  const [email, setEmail] = useState(user.email);
  const [displayName, setDisplayName] = useState(user.displayName ? user.displayName : '');
  const [fooFooDealing, setFooFooDealing] = useState(user.fooFooDealing ? user.fooFooDealing : false);

  const onChange = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'displayName') {
      setDisplayName(value);
    } else {
      setFooFooDealing(!fooFooDealing);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const props = {email, displayName, fooFooDealing}
    updateUser(props);
  };

  return (
    <div className="sign-in-container">
      <h1 className="center">Your Profile</h1>
      <br />
      <div className="sign-in-form-container">
        <Form className="sign-in-form" onSubmit={submitHandler} name="email">
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control onChange={onChange} name="email" value={email} type="email" placeholder="E.g: RustyShackleford@gmail.com" />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Display Name</Form.Label>
            <Form.Control onChange={onChange} name="displayName" value={displayName} type="text" placeholder="John The Baptist" />
          </Form.Group>
          <Form.Group controlId="foofoo">
            <Form.Check onChange={onChange} label="enable foofoo dealing?" type="checkbox" name="foofoo" value={fooFooDealing}></Form.Check>
          </Form.Group>
          <br />
          <div className="center">
            {error
              ? (<p className="error">{`${error.code}: ${error.message}`}</p>)
              : ''
            }
            <Button className="sign-in-button" type="submit">Update Profile</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserProfile;
