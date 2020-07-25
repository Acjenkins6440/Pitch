import React from 'react';
import Table from 'react-bootstrap/Table'

const invites = [
  {
    uid: 42,
    displayName: 'jim',
    gameId: 1
  },
  {
    uid: 43,
    displayName: "fella",
    gameId: 2
  }
]

const example = [
  {
    uid: 44,
    displayName: 'punk',
    status: 'online',
  },
  {
    uid: 43,
    displayName: 'fella',
    status: 'away'
  },
  {
    uid: 42,
    displayName: 'jim',
    status: 'offline'
  },
  {
    uid: 54,
    displayName: 'alwaysPlayin',
    status: 'in game'
  }
]

const listEmpty = () => {
  return false
}

const statusMap = {
  away: 'yellow',
  offline: 'red',
  online: 'green',
  'in game': 'orange'
}

const FriendsList = ({ friends }) => {
  return (
    <Table className="friends-list">
      <tbody>
        {!listEmpty() ?
        example.map((user) => {
          return (
            <tr key={user.uid}>
              <td className={`friend-status`}>
                <svg width="10px" height="20px">
                  <circle className={user.status} cx="5" cy="12" r="4" stroke="black" strokeWidth="1" fill={statusMap[user.status]} />
                </svg>
              </td>
              <td>{user.displayName}</td>
            </tr>
          )
        }) :
        <p>Invite players to be your friend with the button below!</p>
      }
      </tbody>
    </Table>
  )
}

export default FriendsList;