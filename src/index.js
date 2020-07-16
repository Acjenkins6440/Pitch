import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/_all.scss';
import firebase from './firebase.js';

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
