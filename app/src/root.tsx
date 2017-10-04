import * as React from "react";
import {Router, Route, browserHistory} from "react-router";
import {IndexPage} from "./containers/IndexPage";
import {BlockPage} from "./containers/BlockPage";

import "./bulma-root.sass"
import {SearchResultPage} from "./containers/SearchResultPage";

export function Root() {
  return (
    <Router history={browserHistory}>
      <Route path={"/"} component={IndexPage}/>
      <Route path={"/search"} component={SearchResultPage}/>
      <Route path={"/block/:id"} component={BlockPage}/>
    </Router>
  );
}
