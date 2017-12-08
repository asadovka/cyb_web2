import * as React from "react";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";

import { getEthereumBlock } from '../../../modules/search';
import { browserHistory } from 'react-router'

import * as moment from 'moment'

class EthereumBlockPageComponent extends React.Component<{ ethereumBlock, getData, blockNumber }, {}> {
  componentDidMount() {
    const {blockNumber, getData} = this.props;

    getData(blockNumber);
  }

  render() {
    const {ethereumBlock} = this.props;
    return (
      <div>
        <h2 className='title'>Ethereum Block</h2>
        <button className='button' onClick={browserHistory.goBack}>back</button>
         <table className='table is-striped is-fullwidth'>
          <tbody>
            <tr>
              <td>hash</td>
              <td>{ethereumBlock.hash}</td>
            </tr>
            <tr>
              <td>height</td>
              <td>{ethereumBlock.height}</td>
            </tr>
            <tr>
              <td>size</td>
              <td>{ethereumBlock.size}</td>
            </tr>
            <tr>
              <td>number</td>
              <td>{ethereumBlock.number}</td>
            </tr>
            <tr>
              <td>weight</td>
              <td>{ethereumBlock.weight}</td>
            </tr>

            <tr>
              <td>parent_hash</td>
              <td>{ethereumBlock.parent_hash}</td>
            </tr>
            <tr>
              <td>timestamp</td>
              <td>{ethereumBlock.timestamp && moment(ethereumBlock.timestamp.epochSecond).format('YYYY/MM/DD')}</td>
            </tr>
          
            <tr>
              <td>miner</td>
              <td>{ethereumBlock.miner}</td>
            </tr>  

            

            
          </tbody>
        </table>
      </div>
    );
  }
}

export const EthereumBlockPage = withRouter(connect(mapStateToProps, { getData: getEthereumBlock })(EthereumBlockPageComponent));

function mapStateToProps(state, ownProps) {
  return {
    blockNumber: ownProps.routeParams.blockNumber,
    ethereumBlock: state.search.ethereumBlock.data
  };
}
