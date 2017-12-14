import * as React from "react";
import {Router, Route, browserHistory} from "react-router";
import IndexPage from "./containers/IndexPage/";

import "./bulma-root.sass"
import {getLogger} from "./http/Logger";


import {SearchResultPage} from "./containers/search/SearchResultPage/";
import {BitcoinBlockPage} from "./containers/search/BitcoinBlockPage/";
import BitcoinCashBlockPage from "./containers/search/BitcoinCashBlockPage/";

import {BitcoinTxPage} from "./containers/search/BitcoinTxPage/";
import BitcoinCashTxPage from "./containers/search/BitcoinCashTxPage/";
import EthereumTxPage from "./containers/search/EthereumTxPage/";
import EthereumClassicTxPage from "./containers/search/EthereumClassicTxPage/";



import {EthereumBlockPage} from "./containers/search/EthereumBlockPage/";
import EthereumClassicBlockPage from './containers/search/EthereumClassicBlockPage/';
import { DetailsPage } from "./containers/DetailsPage/"

import Tokens from './containers/Tokens/';
import TokensDetails from './containers/TokensDetails/';
import Funds from './containers/Funds/';
import Crowdsales from './containers/Crowdsales/';
import CrowdsalesDetails from './containers/CrowdsalesDetails';
import Analitics from './containers/Analitics/';
import Cybernode from './containers/Cybernode/';
import Blockchains from './containers/Blockchains/';


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
      <Route path={"/tokens"} component={Tokens}/>
      <Route path={"/tokens/:symbol"} component={TokensDetails}/>
      <Route path={"/funds"} component={Funds}/>
      <Route path={"/crowdsales"} component={Crowdsales}/>
      <Route path={"/crowdsales/:system"} component={CrowdsalesDetails}/>
      <Route path={"/blockchains"} component={Blockchains}/>

      <Route path={"/analitics"} component={Analitics}/>
      <Route path={"/cybernode"} component={Cybernode}/>


      <Route component={DetailsPage}>
        <Route path={"/bitcoin/block/:blockNumber"} component={BitcoinBlockPage}/>
        <Route path={"/bitcoin_cash/block/:blockNumber"} component={BitcoinCashBlockPage}/>
        <Route path={"/bitcoin/tx/:txId"} component={BitcoinTxPage}/>
        <Route path={"/bitcoin_cash/tx/:txId"} component={BitcoinCashTxPage}/>
        <Route path={"/ethereum/block/:blockNumber"} component={EthereumBlockPage}/>
        <Route path={"/ethereum_classic/block/:blockNumber"} component={EthereumClassicBlockPage}/>
        <Route path={"/ethereum_classic/tx/:txHash"} component={EthereumClassicTxPage}/>
        <Route path={"/ethereum/tx/:txHash"} component={EthereumTxPage}/>
      </Route>
    </Router>
  );
}
