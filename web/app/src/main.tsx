import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
// import {Root} from "./root";
import {configureStore} from "./configureStore";

import "./global.less";

import App from './App';
import Test from './containers/Test/';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("root")
);

