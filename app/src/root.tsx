import * as React from "react";
import {Router, Route, browserHistory} from "react-router";

import "./bulma-root.sass"


import IndexPage from "./containers/IndexPage/";
import {SearchResultPage} from "./containers/search/SearchResultPage/";

import {BitcoinBlockPage} from "./containers/search/BitcoinBlockPage/";
import {BitcoinTxPage} from "./containers/search/BitcoinTxPage/";

import BitcoinCashBlockPage from "./containers/search/BitcoinCashBlockPage/";
import BitcoinCashTxPage from "./containers/search/BitcoinCashTxPage/";

import {EthereumBlockPage} from "./containers/search/EthereumBlockPage/";
import EthereumTxPage from "./containers/search/EthereumTxPage/";
import EthereumAddressPage from "./containers/search/EthereumAddressPage/";

import EthereumClassicTxPage from "./containers/search/EthereumClassicTxPage/";
import EthereumClassicBlockPage from './containers/search/EthereumClassicBlockPage/';


import Analytics from './containers/Analytics/';
import Blockchains from './containers/Blockchains/';
import Exchanges from './containers/Exchanges/';
import Labels from './containers/Labels/';
import Contracts from './containers/Contracts/';



import Tokens from './containers/Tokens/';
import TokensDetails from './containers/TokensDetails/';

import icos from './containers/icos/';
import icosDetails from './containers/icoDetails';

import Test from './containers/Test/'

// import Funds from './containers/Funds/';
// import Analitics from './containers/Analitics/';
import Cybernode from './containers/Cybernode/';
// import Blockchains from './containers/Blockchains/';
import App from './containers/app/';

import FAQ from './containers/faq/';

var ReactGA = require('react-ga');
ReactGA.initialize('UA-49238979-2');

function logPageView() {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

      

export function Root() {
  return (
    <Router onUpdate={logPageView} history={browserHistory}>
      <Route component={App} >
        <Route path={"/"} component={IndexPage}/>
  
        <Route path={"/search"} component={SearchResultPage}/>
        <Route path={"/test"} component={Test}/>
        
        <Route path={"/bitcoin/block/:blockNumber"} component={BitcoinBlockPage}/>
        <Route path={"/bitcoin/tx/:txId"} component={BitcoinTxPage}/>

        <Route path={"/bitcoin_cash/block/:blockNumber"} component={BitcoinCashBlockPage}/>
        <Route path={"/bitcoin_cash/tx/:txId"} component={BitcoinCashTxPage}/>

        <Route path={"/ethereum/block/:blockNumber"} component={EthereumBlockPage}/>
        <Route path={"/ethereum/tx/:txHash"} component={EthereumTxPage}/>
        <Route path={"/ethereum/address/:hash"} component={EthereumAddressPage}/>


        <Route path={"/ethereum_classic/block/:blockNumber"} component={EthereumClassicBlockPage}/>
        <Route path={"/ethereum_classic/tx/:txHash"} component={EthereumClassicTxPage}/>
        <Route path={"/faq"} component={FAQ}/>
          

        <Route path={"/cybernode"} component={Cybernode}/>
        <Route path={"/analytics"} component={Analytics}/>
        <Route path={"/blockchains"} component={Blockchains}/>
        <Route path={"/exchanges"} component={Exchanges}/>
        <Route path={"/labels"} component={Labels}/>
        <Route path={"/contracts"} component={Contracts}/>


        <Route path={"/tokens"} component={Tokens}/>
        <Route path={"/tokens/:symbol-:base"} component={TokensDetails}/>

        <Route path={"/icos"} component={icos}/>
        <Route path={"/icos/:system"} component={icosDetails}/>

      </Route>
    </Router>
  );
}
