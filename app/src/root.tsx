import * as React from "react";
import {Router, Route, browserHistory} from "react-router";
import {IndexPage} from "./containers/IndexPage/";

import "./bulma-root.sass"
import {SearchResultPage} from "./containers/SearchResultPage/";
import {getLogger} from "./http/Logger";
import {BitcoinBlockPage} from "./containers/BitcoinBlockPage/";
import {BitcoinTxPage} from "./containers/BitcoinTxPage/";
import {EthereumTxPage} from "./containers/EthereumTxPage/";
import {EthereumBlockPage} from "./containers/EthereumBlockPage/";
import { DetailsPage } from "./containers/DetailsPage/"

var ReactGA = require('react-ga');
ReactGA.initialize('UA-49238979-2');

function logPageView() {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

function onSearchEnter(state, replace) {
  if ((state.location.query.q || "").length <= 2) {
    getLogger("Search onEnter").debug("Query string length less than three charters.");
    replace("/");
  }
}

export function Root() {
  return (
    <Router onUpdate={logPageView} history={browserHistory}>
      <Route path={"/"} component={IndexPage}/>
      <Route path={"/search"} component={SearchResultPage}/>
      <Route component={DetailsPage}>
        <Route path={"/bitcoin/block/:blockNumber"} component={BitcoinBlockPage}/>
        <Route path={"/bitcoin/tx/:txId"} component={BitcoinTxPage}/>
        <Route path={"/ethereum/block/:blockNumber"} component={EthereumBlockPage}/>
        <Route path={"/ethereum/tx/:txHash"} component={EthereumTxPage}/>
      </Route>
    </Router>
  );
}
