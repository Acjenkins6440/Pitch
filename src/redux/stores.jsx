import Redux from 'redux'
import React from 'react'
import PropTypes from 'prop-types'
import reducers from './reducers.jsx'

cardReducer = reducers['cardReducer'];
const cardStore = Redux.createStore(cardReducer);

const stores = {
  cardStore: cardStore
};



export default stores
