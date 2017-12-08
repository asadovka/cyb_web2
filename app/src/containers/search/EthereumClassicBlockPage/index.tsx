import * as React from "react";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";

import { getEthereumClassicBlock } from '../../../modules/search';
import { browserHistory } from 'react-router'

import * as moment from 'moment'

class EthereumClassicBlockPage extends React.Component<{ data, getData, blockNumber }, {}> {
  componentDidMount() {
    const {blockNumber, getData} = this.props;

    getData(blockNumber);
  }

  render() {
    const {data} = this.props;
    return (
      <div>
        <h2 className='title'>Ethereum Classic Block</h2>
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
              <td>{data.number}</td>
            </tr>
            <tr>
              <td>weight</td>
              <td>{data.weight}</td>
            </tr>

            <tr>
              <td>parent_hash</td>
              <td>{data.parent_hash}</td>
            </tr>
            <tr>
              <td>timestamp</td>
              <td>{data.timestamp && moment(data.timestamp.epochSecond).format('YYYY/MM/DD')}</td>
            </tr>
          
            <tr>
              <td>miner</td>
              <td>{data.miner}</td>
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
      data: state.search.ethereumBlock.data
    }),
    { getData: getEthereumClassicBlock }
  )(EthereumClassicBlockPage)
);

