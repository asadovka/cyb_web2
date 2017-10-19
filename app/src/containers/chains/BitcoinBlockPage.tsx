import * as React from "react";
import {BlockComponent} from "../../components/BlockComponent";
import {connect} from "react-redux";
import {CfState} from "../../model/CfState";
import {CfActions, BitcoinBlockResponse} from "../../actions/CfActions";
import withRouter from "react-router/es/withRouter";
import JSONTree from "react-json-tree";
import {reactJsonTreeTheme} from "./common";

class BitcoinBlockPageComponent extends React.Component<{ bitcoinBlock, getData, blockNumber }, {}> {
  componentDidMount() {
    const {blockNumber, getData} = this.props;

    getData(blockNumber);
  }

  render() {
    const {bitcoinBlock} = this.props;

    return (
      <BlockComponent
        title={"Bitcoin Block"}
        data={bitcoinBlock}
        blockView={(data: BitcoinBlockResponse) => {
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

export const BitcoinBlockPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(BitcoinBlockPageComponent));

function mapStateToProps(state: CfState, ownProps) {
  return {
    blockNumber: ownProps.routeParams.blockNumber,
    bitcoinBlock: state.data.bitcoinBlock.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getData: (blockNumber: string) => {
      dispatch({
        type: CfActions.GET_BITCOIN_BLOCK,
        payload: {blockNumber}
      });
    }
  };
}

