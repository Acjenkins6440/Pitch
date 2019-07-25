import React from "react";
import ReactDOM from "react-dom";
import EnhancedApp from "./components/EnhancedApp";
import { Provider } from "react-redux"
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <EnhancedApp />
  </Provider>,
  document.getElementById('app')
);
