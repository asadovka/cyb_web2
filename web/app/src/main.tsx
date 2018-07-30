import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
// import {Root} from "./root";
import {configureStore} from "./configureStore";

import "./global.less";

import App from './App';
import Test from './containers/Test/';

const store = configureStore();


import {Router, Route, browserHistory} from "react-router";


const Root = () => (
  <Router history={browserHistory}>
    <Route path={"/:q::app"} component={App}/>
    <Route path={"/::app"} component={App}/>
    <Route path={"/"} component={App}/>
  </Router>
);

    // 

ReactDOM.render(
  <Provider store={store}>
    <Root/>
  </Provider>,
  document.getElementById("root")
);

