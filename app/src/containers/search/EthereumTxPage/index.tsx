import * as React from "react";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";

import { getEthereumTx } from '../../../modules/search';
import { browserHistory } from 'react-router'

class EthereumTxPage extends React.Component<{ data, getData, txHash }, {}> {
  componentDidMount() {
    const {txHash, getData} = this.props;

    getData(txHash);
  }

  render() {
    const {data} = this.props;

    return (
      <div>
        <h2 className='title'>Ethereum Transaction</h2>
        <button className='button' onClick={browserHistory.goBack}>back</button>
        <table className='table is-striped is-fullwidth'>
          <tbody>
            <tr>
              <td>block hash</td>
              <td>{data.block_hash}</td>
            </tr>
            <tr>
              <td>block number</td>
              <td>{data.block_number}</td>
            </tr>
            <tr>
              <td>from</td>
              <td>{data.from}</td>
            </tr>
            <tr>
              <td>gas limit</td>
              <td>{data.gas_limit}</td>
            </tr>
            <tr>
              <td>gas price</td>
              <td>{data.gas_price}</td>
            </tr>
            <tr>
              <td>gas used</td>
              <td>{data.gas_used}</td>
            </tr>
            <tr>
              <td>hash</td>
              <td>{data.hash}</td>
            </tr>
            <tr>
              <td>input</td>
              <td>{data.input}</td>
            </tr>
            <tr>
              <td>timestamp</td>
              <td>{data.timestamp && data.timestamp.epochSecond}</td>
            </tr>
            <tr>
              <td>to</td>
              <td>{data.to}</td>
            </tr>
            <tr>
              <td>transaction index</td>
              <td>{data.transaction_index}</td>
            </tr>
            <tr>
              <td>value</td>
              <td>{data.value}</td>
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
      txHash: ownProps.routeParams.txHash,
      data: state.search.ethereumTx.data
    }),
    { getData: getEthereumTx }
  )(EthereumTxPage)
);


