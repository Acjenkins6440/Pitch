import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { setBid, pass } from '../../providers/GameProvider';

const BidInterface = ({ isDealer, activeGame, user }) => {
  const handlePass = () => { pass(activeGame); };
  const handleBid = bid => setBid({ bid, player: user }, activeGame);

  const bidTwo = () => { handleBid(2); };
  const bidThree = () => { handleBid(3); };
  const bidFour = () => { handleBid(4); };
  const bidFive = () => { handleBid(5); };

  return (
    <div className="generic-container">
      <div>
        <p>Place your bid!</p>
      </div>
      <div>
        <Button
          onClick={handlePass}
          onKeyPress={handlePass}
          disabled={isDealer && !activeGame.currentBid.bid}
        >
          Pass
        </Button>
        <Button
          onClick={bidTwo}
          onKeyPress={bidTwo}
          disabled={activeGame.currentBid.bid >= 2}
        >
          2
        </Button>
        <Button
          onClick={bidThree}
          onKeyPress={bidThree}
          disabled={activeGame.currentBid.bid >= 3}
        >
          3
        </Button>
        <Button
          onClick={bidFour}
          onKeyPress={bidFour}
          disabled={activeGame.currentBid.bid >= 4}
        >
          4
        </Button>
        <Button
          onClick={bidFive}
          onKeyPress={bidFive}
          disabled={activeGame.currentBid.bid >= 5}
        >
          Shoot the moon!
        </Button>
      </div>
    </div>
  );
};

BidInterface.propTypes = {
  activeGame: PropTypes.shape({
    currentBid: PropTypes.shape({
      bid: PropTypes.number,
    }),
  }).isRequired,
  isDealer: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
};

export default BidInterface;
