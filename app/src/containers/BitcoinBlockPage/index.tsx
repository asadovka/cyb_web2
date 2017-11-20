import * as React from "react";
import {connect} from "react-redux";
import {CfState} from "../../model/CfState";
import {CfActions, BitcoinBlockResponse} from "../../actions/CfActions";
import JSONTree from "../../components/JSONTree/";
import withRouter from "react-router/es/withRouter";
import Title from "../../components/title/";
import { getBitcoinBlock } from '../../modules/search';


class BitcoinBlockPageComponent extends React.Component<{ bitcoinBlock, getData, blockNumber }, {}> {
  componentDidMount() {
    const {blockNumber, getData} = this.props;

    getData(blockNumber);
  }

  render() {
    const {bitcoinBlock} = this.props;

    return (
      <Title title='Bitcoin Block'>
        <JSONTree data={bitcoinBlock} />
      </Title>
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

