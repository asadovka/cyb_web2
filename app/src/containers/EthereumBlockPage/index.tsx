import * as React from "react";
import {connect} from "react-redux";
import {CfState} from "../../model/CfState";
import {CfActions, EthereumBlockResponse} from "../../actions/CfActions";
import withRouter from "react-router/es/withRouter";
import JSONTree from "../../components/JSONTree/";
import Title from "../../components/title/";

import { getEthereumBlock } from '../../modules/search';

class EthereumBlockPageComponent extends React.Component<{ ethereumBlock, getData, blockNumber }, {}> {
  componentDidMount() {
    const {blockNumber, getData} = this.props;

    getData(blockNumber);
  }

  render() {
    const {ethereumBlock} = this.props;

    return (
      <Title title='Ethereum Block'>
        <JSONTree data={ethereumBlock} />
      </Title>
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
