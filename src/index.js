import React from "react";
import ReactDOM from "react-dom";
import EnhancedApp from "./components/EnhancedApp.jsx";
import { Provider } from "react-redux"
import stores from './redux/stores.jsx';

const store = stores['deckStore'];

ReactDOM.render(
  <Provider store={store}>
    <EnhancedApp />
  </Provider>,
  document.getElementById('app')
);
