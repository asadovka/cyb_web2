import * as React from "react";
import {connect} from "react-redux";
import {CfState} from "../../model/CfState";
import {CfActions, BitcoinBlockResponse} from "../../actions/CfActions";
import JSONTree from "../../components/JSONTree/";
import withRouter from "react-router/es/withRouter";
import { getBitcoinBlock } from '../../modules/search';

import { Link } from 'react-router';
import { browserHistory } from 'react-router'
class BitcoinBlockPageComponent extends React.Component<{ bitcoinBlock, getData, blockNumber }, {}> {
  componentDidMount() {
    const {blockNumber, getData} = this.props;

    getData(blockNumber);
  }

  render() {
    const {bitcoinBlock } = this.props;

    return (
      <div>
        <h2 className='title'>Bitcoin Block</h2>
        <button className='button' onClick={browserHistory.goBack}>back</button>
        <table className='table is-striped is-fullwidth'>
          <tbody>
            <tr>
              <td>hash</td>
              <td>{bitcoinBlock.hash}</td>
            </tr>
            <tr>
              <td>height</td>
              <td>{bitcoinBlock.height}</td>
            </tr>
            <tr>
              <td>size</td>
              <td>{bitcoinBlock.size}</td>
            </tr>
            <tr>
              <td>number</td>
              <td>{bitcoinBlock.tx_number}</td>
            </tr>
            <tr>
              <td>weight</td>
              <td>{bitcoinBlock.weight}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export const BitcoinBlockPage = withRouter(connect(mapStateToProps, { getData: getBitcoinBlock })(BitcoinBlockPageComponent));

function mapStateToProps(state, ownProps) {
  return {
    blockNumber: ownProps.routeParams.blockNumber,
    bitcoinBlock: state.search.bitcoinBlock.data
  };
}

