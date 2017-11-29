import * as React from "react";

import App from '../app/';
     
import { Table, Indicator, Title } from '../../components/ApiIndicator/';

import { checkApi } from '../../modules/cybernode';
import { connect } from 'react-redux';
var config = require('./config.js')

class Cybernode extends React.Component<any, any> {
  componentDidMount() {
    this.props.checkApi();
  }
  render() {
    const {
      chaingearApiAvailable,
      searchApiAvailable,
      marketApiAvailable
    } = this.props;

    return (
      <App>
        <Title>API status:</Title>
        <Table>
          <tbody>
            <tr>
              <td>CYBER_CHAINGEAR_API</td>
              <td>{config.CYBER_CHAINGEAR_API}</td>
              <td>
                <Indicator available={chaingearApiAvailable}/>
              </td>
            </tr>
            <tr>
              <td>CYBER_SEARCH_API</td>
              <td>{config.CYBER_SEARCH_API}</td>
              <td><Indicator available={searchApiAvailable}/></td>
            </tr>
            <tr>
              <td>CYBER_MARKETS_API</td>
              <td>{config.CYBER_MARKETS_API}</td>
              <td><Indicator available={marketApiAvailable} /></td>
            </tr>
          </tbody>
        </Table>
      </App>
    );    
  }
}

export default connect(
  state => ({
    chaingearApiAvailable: state.cybernode.chaingearApiAvailable,
    searchApiAvailable: state.cybernode.searchApiAvailable,
    marketApiAvailable: state.cybernode.marketApiAvailable
  }),
  { checkApi }
)(Cybernode);
