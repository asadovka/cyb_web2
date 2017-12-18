import * as React from "react";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";

import { getBitcoinTx } from '../../../modules/search';

import { browserHistory } from 'react-router'

class BitcoinTxPageComponent extends React.Component {
  componentDidMount() {
    const {txId, getData} = this.props;

    getData(txId);
  }

  render() {
    const {data} = this.props;
    console.log(' data ', data)
    return (
      <div>
        <h2 className='title'>Bitcoin Transaction</h2>
        <button className='button' onClick={browserHistory.goBack}>back</button>
        <table className='table is-striped is-fullwidth'>
          <tbody>
            <tr>
              <td>hash</td>
              <td>{data.hash}</td>
            </tr>
            <tr>
              <td>block hash</td>
              <td>{data.block_hash}</td>
            </tr>
            <tr>
              <td>block number</td>
              <td>{data.block_number}</td>
            </tr>
            <tr>
              <td>block time</td>
              <td>block_time</td>
            </tr>
            <tr>
              <td>fee</td>
              <td>{data.fee}</td>
            </tr>
            <tr>
              <td>total input</td>
              <td>{data.total_input}</td>
            </tr>
            <tr>
              <td>total output</td>
              <td>{data.total_output}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export const BitcoinTxPage = withRouter(connect(mapStateToProps, { getData: getBitcoinTx })(BitcoinTxPageComponent));

function mapStateToProps(state, ownProps) {
  return {
    txId: ownProps.routeParams.txId,
    data: state.search.bitcoinTx.data
  };
}


