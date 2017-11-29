import * as React from "react";

import App from '../app/';
     
var config = require('./config.js')

const s = {
    width: 20,
    height: 20,
    border: '1px solid #000',
    display: 'block',
    borderRadius: '50%',
    background: 'red'
}

const r = {
  paddingRight: 20
}

class Cybernode extends React.Component {

  render() {
    return (
      <App>
        <h2>API status:</h2>
        <table>
          <tbody>
            <tr>
              <td style={r}>CYBER_CHAINGEAR_API</td>
              <td style={r}>{config.CYBER_CHAINGEAR_API}</td>
              <td style={r}>
                <span style={s}/>
              </td>
            </tr>
            <tr>
              <td style={r}>CYBER_SEARCH_API</td>
              <td style={r}>{config.CYBER_SEARCH_API}</td>
              <td><span style={s}/></td>
            </tr>
            <tr>
              <td style={r}>CYBER_MARKETS_API</td>
              <td style={r}>{config.CYBER_MARKETS_API}</td>
              <td><span style={s}/></td>
            </tr>
          </tbody>
        </table>
      </App>
    );    
  }
}

export default Cybernode;
