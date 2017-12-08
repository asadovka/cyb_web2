import * as React from "react";
import {connect} from "react-redux";
import {CfActions, BitcoinBlockResponse} from "../../../actions/CfActions";
import withRouter from "react-router/es/withRouter";
import { getBitcoinCashBlock } from '../../../modules/search';

import { Link } from 'react-router';
import { browserHistory } from 'react-router'
class BitcoinCashBlockPage extends React.Component<{ data, getData, blockNumber }, {}> {
  componentDidMount() {
    const {blockNumber, getData} = this.props;

    getData(blockNumber);
  }

  render() {
    const {data } = this.props;

    return (
      <div>
        <h2 className='title'>Bitcoin Cash Block</h2>
        <button className='button' onClick={browserHistory.goBack}>back</button>
        <table className='table is-striped is-fullwidth'>
          <tbody>
            <tr>
              <td>hash</td>
              <td>{data.hash}</td>
            </tr>
            <tr>
              <td>height</td>
              <td>{data.height}</td>
            </tr>
            <tr>
              <td>size</td>
              <td>{data.size}</td>
            </tr>
            <tr>
              <td>number</td>
              <td>{data.tx_number}</td>
            </tr>
            <tr>
              <td>weight</td>
              <td>{data.weight}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(
  connect(
    (state, ownProps) => ({
      blockNumber: ownProps.routeParams.blockNumber,
      data: state.search.bitcoinBlock.data
    })
    , { getData: getBitcoinCashBlock }
  )(BitcoinCashBlockPage)
);


