import * as React from "react";
import withRouter from "react-router/es/withRouter";

import App from '../app/';
     
import { connect } from 'react-redux';

import { showTokensDetails, getSystemLogoUrl } from '../../modules/chaingear';

import Tabs from './Tabs';
import LatestBlocks from './LatestBlocks';
import Mempool from './Mempool';
import ComingSoon from '../../components/ComingSoon/';

class Blockchains extends React.Component<any, any> {
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <ComingSoon/>
      </div>
    );    
  }
}

export default connect(
  null,
  { showTokensDetails }
)(Blockchains);
