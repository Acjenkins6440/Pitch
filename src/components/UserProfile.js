import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { updateUser } from '../providers/UserProvider';

const UserProfile = ({
  user, userPrefs, setUserPrefs,
}) => {
  const [email, setEmail] = useState(user.email);
  const [displayName, setDisplayName] = useState(userPrefs.displayName ? userPrefs.displayName : '');
  const [fooFooDealing, setFooFooDealing] = useState(userPrefs.fooFooDealing ? userPrefs.fooFooDealing : 'disabled');
  const [error, setError] = useState(null);

  const onChange = (event) => {
    const { name, value } = event.currentTarget;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'displayName') {
      setDisplayName(value);
    } else {
      setFooFooDealing(fooFooDealing === 'disabled' ? 'enabled' : 'disabled');
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const props = { email, displayName, fooFooDealing };
    updateUser(props, setUserPrefs, user, setError);
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
          <Form.Group>
            <Form.Label>FooFoo Dealing</Form.Label>
            <select className="form-control" onChange={onChange} value={fooFooDealing}>
              <option>disabled</option>
              <option>enabled</option>
            </select>
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

UserProfile.defaultProps = {
  userPrefs: {},
};

UserProfile.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  userPrefs: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    fooFooDealing: PropTypes.string,
  }),
  setUserPrefs: PropTypes.func.isRequired,
};

export default UserProfile;
