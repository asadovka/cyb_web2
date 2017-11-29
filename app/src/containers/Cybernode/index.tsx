import * as React from "react";

import App from '../app/';
     
var config = require('./config.js')

import { Table, Indicator, Title } from '../../components/ApiIndicator/';


class Cybernode extends React.Component {

  render() {
    return (
      <App>
        <Title>API status:</Title>
        <Table>
          <tbody>
            <tr>
              <td>CYBER_CHAINGEAR_API</td>
              <td>{config.CYBER_CHAINGEAR_API}</td>
              <td>
                <Indicator available={false}/>
              </td>
            </tr>
            <tr>
              <td>CYBER_SEARCH_API</td>
              <td>{config.CYBER_SEARCH_API}</td>
              <td><Indicator available={false}/></td>
            </tr>
            <tr>
              <td>CYBER_MARKETS_API</td>
              <td>{config.CYBER_MARKETS_API}</td>
              <td><Indicator available={true} /></td>
            </tr>
          </tbody>
        </Table>
      </App>
    );    
  }
}

export default Cybernode;
