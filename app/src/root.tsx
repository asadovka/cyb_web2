import * as React from "react";
import {Router, Route, browserHistory} from "react-router";
import {IndexPage} from "./containers/IndexPage";
import {BlockPage} from "./containers/BlockPage";

import "./bulma-root.sass"

export function Root() {
  return (
    <Router history={browserHistory}>
      <Route path={"/"} component={IndexPage}/>
      <Route path={"/block"} component={BlockPage}/>
    </Router>
  );
}
