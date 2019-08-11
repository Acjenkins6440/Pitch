import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import EnhancedApp from './components/EnhancedApp';
import store, { rrfProps } from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <EnhancedApp />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('app'),
);
