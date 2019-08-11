import React from 'react';
import PropTypes from 'prop-types';

const Hand = ({ children }) => (
  <div>
    {children}
  </div>
);

Hand.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Hand;
