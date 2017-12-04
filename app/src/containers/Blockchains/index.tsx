import * as React from "react";
import withRouter from "react-router/es/withRouter";

import App from '../app/';
     
import { connect } from 'react-redux';

import { showTokensDetails, getSystemLogoUrl } from '../../modules/chaingear';

import Tabs from './Tabs';
import LatestBlocks from './LatestBlocks';
import Mempool from './Mempool';

class Blockchains extends React.Component<any, any> {
  componentDidMount() {
  }
  render() {
    return (
      <App>
        <Tabs />
        <LatestBlocks />
        <Mempool />
      </App>
    );    
  }
}

export default connect(
  null,
  { showTokensDetails }
)(Blockchains);
