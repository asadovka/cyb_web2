import * as React from "react";
import {connect} from "react-redux";
import {CfState} from "../../model/CfState";
import {CfActions, EthereumBlockResponse} from "../../actions/CfActions";
import withRouter from "react-router/es/withRouter";
import JSONTree from "../../components/JSONTree/";

import { getEthereumBlock } from '../../modules/search';

class EthereumBlockPageComponent extends React.Component<{ ethereumBlock, getData, blockNumber }, {}> {
  componentDidMount() {
    const {blockNumber, getData} = this.props;

    getData(blockNumber);
  }

  render() {
    const {ethereumBlock} = this.props;

    return (
      <div>
        <h2>Ethereum Block</h2>
        <JSONTree data={ethereumBlock} />
      </div>
    );
  }
}

export const EthereumBlockPage = withRouter(connect(mapStateToProps, { getData: getEthereumBlock })(EthereumBlockPageComponent));

function mapStateToProps(state: CfState, ownProps) {
  return {
    blockNumber: ownProps.routeParams.blockNumber,
    ethereumBlock: state.data.ethereumBlock.data
  };
}
