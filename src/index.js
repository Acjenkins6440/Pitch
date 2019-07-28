import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import EnhancedApp from './components/EnhancedApp';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <EnhancedApp />
  </Provider>,
  document.getElementById('app'),
);
