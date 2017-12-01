import * as React from "react";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";
import JSONTree from "../../components/JSONTree/";

import { getBitcoinTx } from '../../modules/search';


class BitcoinTxPageComponent extends React.Component<{ bitcoinTx, getData, txId }, {}> {
  componentDidMount() {
    const {txId, getData} = this.props;

    getData(txId);
  }

  render() {
    const {bitcoinTx} = this.props;

    return (
      <div>
        <h2>Bitcoin Transaction</h2>
        <JSONTree data={bitcoinTx} />
      </div>
    );
  }
}

export const BitcoinTxPage = withRouter(connect(mapStateToProps, { getData: getBitcoinTx })(BitcoinTxPageComponent));

function mapStateToProps(state, ownProps) {
  return {
    txId: ownProps.routeParams.txId,
    bitcoinTx: state.search.bitcoinTx.data
  };
}


