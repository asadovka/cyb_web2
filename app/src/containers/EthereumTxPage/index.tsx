import * as React from "react";
import {connect} from "react-redux";
import {CfState} from "../../model/CfState";
import {CfActions, EthereumBlockResponse} from "../../actions/CfActions";
import withRouter from "react-router/es/withRouter";
import JSONTree from "../../components/JSONTree/";
import Title from "../../components/title/";

import { getEthereumTx } from '../../modules/search';

class EthereumTxPageComponent extends React.Component<{ ethereumTx, getData, txHash }, {}> {
  componentDidMount() {
    const {txHash, getData} = this.props;

    getData(txHash);
  }

  render() {
    const {ethereumTx} = this.props;

    return (
      <Title title='Ethereum Transaction'>
        <JSONTree data={ethereumTx} />
      </Title>
    );
  }
}

export const EthereumTxPage = withRouter(connect(mapStateToProps, { getData: getEthereumTx })(EthereumTxPageComponent));

function mapStateToProps(state: CfState, ownProps) {
  return {
    txHash: ownProps.routeParams.txHash,
    ethereumTx: state.data.ethereumTx.data
  };
}


