import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import "./global.less";
import App from './containers/app/App';
import {Router, Route, browserHistory} from "react-router";

const Root = () => (
  <Router history={browserHistory}>
    <Route path={"/:q::app"} component={App}/>
    <Route path={"/::app"} component={App}/>
    <Route path={"/"} component={App}/>
  </Router>
);

ReactDOM.render(
  <Root/>,
  document.getElementById("root")
);

