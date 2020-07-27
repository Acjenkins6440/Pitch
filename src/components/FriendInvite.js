import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { sendFriendInvite } from '../providers/UserProvider';

const FriendInvite = () => {
  const [friendInvite, setFriendInvite] = useState('');
  const [error, setError] = useState(null);

  const onChange = (event) => {
    const { value } = event.currentTarget;
    setFriendInvite(value)
  }

  const onSubmit = (event) => {
    event.preventDefault();
    sendFriendInvite(friendInvite, setError)
  }

  return(
    <Modal.Footer>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="friendInvite">
            <span className="inline-form">
              <Form.Control onChange={onChange} required type="text" placeholder="Player to invite"></Form.Control>
              <Button variant="primary" type="submit">Send Invite</Button>
            </span>
          </Form.Group>
        </Form>
    </Modal.Footer>
  )
}

export default FriendInvite;