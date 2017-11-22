import * as React from "react";
import {connect} from "react-redux";
import {CfState} from "../../model/CfState";
import {CfActions, BitcoinBlockResponse} from "../../actions/CfActions";
import JSONTree from "../../components/JSONTree/";
import withRouter from "react-router/es/withRouter";
import { getBitcoinBlock } from '../../modules/search';


class BitcoinBlockPageComponent extends React.Component<{ bitcoinBlock, getData, blockNumber }, {}> {
  componentDidMount() {
    const {blockNumber, getData} = this.props;

    getData(blockNumber);
  }

  render() {
    const {bitcoinBlock} = this.props;

    return (
      <div>
        <h2>Bitcoin Block</h2>
        <JSONTree data={bitcoinBlock} />
      </div>
    );
  }
}

export const BitcoinBlockPage = withRouter(connect(mapStateToProps, { getData: getBitcoinBlock })(BitcoinBlockPageComponent));

function mapStateToProps(state: CfState, ownProps) {
  return {
    blockNumber: ownProps.routeParams.blockNumber,
    bitcoinBlock: state.data.bitcoinBlock.data
  };
}

