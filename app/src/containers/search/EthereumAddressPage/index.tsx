import * as React from "react";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";

import { getEthereumAddress } from '../../../modules/search';
import { browserHistory } from 'react-router'

class EthereumTxPage extends React.Component {
  componentDidMount() {
    const {hash, getData} = this.props;

    getData(hash);
  }

  render() {
    const {hash} = this.props;

    const rows = this.props.transactions.map(t => (
      <tr>
        <td>{t.txHash}</td>
      </tr>
    ))
    return (
      <div>
        <h2 className='title'>Ethereum adress: {hash}</h2>

        <a href='#' className='button' >get svg</a>
        <table>
          <thead>
            <tr>
              <th>TxHash</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(
  connect(
    (state, ownProps) => ({
      hash: ownProps.routeParams.hash,
      transactions: [
        { hash: '27c4d937dca276fb2b61e579902e8a876fd5b5abc17590410ced02d5a9f8e483'}
      ]
    }),
    { getData: getEthereumAddress }
  )(EthereumTxPage)
);


