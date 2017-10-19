import * as React from "react";
import {BlockComponent} from "../../components/BlockComponent";
import {connect} from "react-redux";
import {CfState} from "../../model/CfState";
import {CfActions, EthereumBlockResponse} from "../../actions/CfActions";
import withRouter from "react-router/es/withRouter";
import JSONTree from "react-json-tree";
import {reactJsonTreeTheme} from "./common";

class EthereumTxPageComponent extends React.Component<{ ethereumTx, getData, txHash }, {}> {
  componentDidMount() {
    const {txHash, getData} = this.props;

    getData(txHash);
  }

  render() {
    const {ethereumTx} = this.props;

    return (
      <BlockComponent
        title={"Ethereum Transaction"}
        data={ethereumTx}
        blockView={(data: EthereumBlockResponse) => {
          return (
            <JSONTree
              data={data}
              theme={reactJsonTreeTheme}
              invertTheme={true}
            />
          );
        }}
      />
    );
  }
}

export const EthereumTxPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(EthereumTxPageComponent));

function mapStateToProps(state: CfState, ownProps) {
  return {
    txHash: ownProps.routeParams.txHash,
    ethereumTx: state.data.ethereumTx.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getData: (txHash: string) => {
      dispatch({
        type: CfActions.GET_ETHEREUM_TX,
        payload: {txHash}
      });
    }
  };
}

