import * as React from "react";
import {connect} from "react-redux";
import {CfActions, EthereumBlockResponse} from "../../actions/CfActions";
import withRouter from "react-router/es/withRouter";
import JSONTree from "../../components/JSONTree/";

import { getEthereumTx } from '../../modules/search';

class EthereumTxPageComponent extends React.Component<{ ethereumTx, getData, txHash }, {}> {
  componentDidMount() {
    const {txHash, getData} = this.props;

    getData(txHash);
  }

  render() {
    const {ethereumTx} = this.props;

    return (
      <div>
        <h2>Ethereum Transaction</h2>
        <JSONTree data={ethereumTx} />
      </div>
    );
  }
}

export const EthereumTxPage = withRouter(connect(mapStateToProps, { getData: getEthereumTx })(EthereumTxPageComponent));

function mapStateToProps(state, ownProps) {
  return {
    txHash: ownProps.routeParams.txHash,
    ethereumTx: state.search.ethereumTx.data
  };
}


