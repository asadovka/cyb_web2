import * as React from "react";
import {Router, Route, browserHistory} from "react-router";

import "./bulma-root.sass"


import Registers from './containers/chaingear/allregister/';
import NewRegisters from './containers/chaingear/newregister/';
import RegistersDetails from './containers/chaingear/registrerdetails/';


import IndexPage from "./containers/IndexPage/";
import { SearchResultPage, SearchMenu } from "./containers/search/SearchResultPage/";

import {BitcoinBlockPage} from "./containers/search/BitcoinBlockPage/";
import {BitcoinTxPage} from "./containers/search/BitcoinTxPage/";

import BitcoinCashBlockPage from "./containers/search/BitcoinCashBlockPage/";
import BitcoinCashTxPage from "./containers/search/BitcoinCashTxPage/";

import {EthereumBlockPage} from "./containers/search/EthereumBlockPage/";
import EthereumTxPage from "./containers/search/EthereumTxPage/";
import EthereumAddressPage from "./containers/search/EthereumAddressPage/";
import EthereumUncle from './containers/search/EthereumUncle/';

import EthereumClassicTxPage from "./containers/search/EthereumClassicTxPage/";
import EthereumClassicBlockPage from './containers/search/EthereumClassicBlockPage/';
import EthereumClassicContractPage from './containers/search/EthereumClassicContractPage/'

import Analytics from './containers/Analytics/';
import Blockchains from './containers/Blockchains/';
import Exchanges from './containers/Exchanges/';
import Labels from './containers/Labels/';
import Contracts from './containers/Contracts/';

import EthereumClassicUncle from './containers/search/EthereumClassicUncle/'


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


const TestLayout = ({ menu, children }) => (
  <div>
    <div>
      {menu}
    </div>
    <div>
      {children}
    </div>
  </div>
)

import Container from './components/Container/';

const Wrapper = ({ children }) => (
  <Container>
    {children}
  </Container>
)

export function Root() {
  return (
    <Router onUpdate={logPageView} history={browserHistory}>
        <Route path={"/"} component={IndexPage}/>
      <Route component={App} >
      <Route component={Wrapper} >
  
        {/*<Route path={"/search"} component={SearchResultPage}/>*/}
        
        <Route path={"/bitcoin/block/:blockNumber"} component={BitcoinBlockPage}/>
        <Route path={"/bitcoin/tx/:txId"} component={BitcoinTxPage}/>

        <Route path={"/bitcoin_cash/block/:blockNumber"} component={BitcoinCashBlockPage}/>
        <Route path={"/bitcoin_cash/tx/:txId"} component={BitcoinCashTxPage}/>

        <Route path={"/ethereum/block/:blockNumber"} component={EthereumBlockPage}/>
        <Route path={"/ethereum/tx/:txHash"} component={EthereumTxPage}/>
        <Route path={"/ethereum/contract/:hash"} component={EthereumAddressPage}/>
        <Route path={"/ethereum/uncle/:hash"} component={EthereumUncle}/>


        <Route path={"/ethereum_classic/block/:blockNumber"} component={EthereumClassicBlockPage}/>
        <Route path={"/ethereum_classic/tx/:txHash"} component={EthereumClassicTxPage}/>
        <Route path={"/ethereum_classic/uncle/:hash"} component={EthereumClassicUncle}/>
        <Route path={"/ethereum_classic/contract/:hash"} component={EthereumClassicContractPage}/>
        <Route path={"/faq"} component={FAQ}/>
          

        <Route path={"/cybernode"} component={Cybernode}/>
        <Route path={"/analytics"} component={Analytics}/>
        <Route path={"/blockchains"} component={Blockchains}/>
        <Route path={"/exchanges"} component={Exchanges}/>
        <Route path={"/labels"} component={Labels}/>
        <Route path={"/contracts"} component={Contracts}/>

        <Route path={"/registers/new"} component={NewRegisters}/>
        <Route path={"/registers/:address"} component={RegistersDetails}/>
        <Route path={"/registers"} component={Registers}/>


        <Route path={"/tokens"} component={Tokens}/>
        <Route path={"/tokens/:symbol-:base"} component={TokensDetails}/>

        <Route path={"/icos"} component={icos}/>
        <Route path={"/icos/:system"} component={icosDetails}/>
       </Route>
      </Route>
      <Route component={App} >
        <Route path={"/search"} components={{ children: SearchResultPage, menu: SearchMenu }}/>
      </Route>
    </Router>
  );
}
