import * as React from "react";
import {BlockComponent} from "../../components/BlockComponent";
import {connect} from "react-redux";
import {CfState} from "../../model/CfState";
import {CfActions, EthereumBlockResponse} from "../../actions/CfActions";
import withRouter from "react-router/es/withRouter";
import JSONTree from "react-json-tree";
import {reactJsonTreeTheme} from "./common";

class EthereumBlockPageComponent extends React.Component<{ ethereumBlock, getData, blockNumber }, {}> {
  componentDidMount() {
    const {blockNumber, getData} = this.props;

    getData(blockNumber);
  }

  render() {
    const {ethereumBlock} = this.props;

    return (
      <BlockComponent
        title={"Ethereum Block"}
        data={ethereumBlock}
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

export const EthereumBlockPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(EthereumBlockPageComponent));

function mapStateToProps(state: CfState, ownProps) {
  return {
    blockNumber: ownProps.routeParams.blockNumber,
    ethereumBlock: state.data.ethereumBlock.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getData: (blockNumber: string) => {
      dispatch({
        type: CfActions.GET_ETHEREUM_BLOCK,
        payload: {blockNumber}
      });
    }
  };
}

