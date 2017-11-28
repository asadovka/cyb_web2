import * as React from "react";

import App from '../app/';
     
import {Injector} from "../../injector";
const {
  http
} = Injector.of();

import {ConfigConstants} from "../../config/ConfigConstants";
var config = require('./config.js')

class Assets extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    //https://raw.githubusercontent.com/cyberFund/chaingear/gh-pages/chaingear.json
    http.GET(`${config.CYBER_CHAINGEAR_API}/api/tokens`)
      .then(data => {
        this.setState({
          items: data
        })
      })

//   console.log('CYBER_CHAINGEAR_API> ', window.env.CYBER_CHAINGEAR_API)
    
  }
  render() {
    const rows = this.state.items.map(item => (
      <tr>
        <td>
          <img src={item.icon}/>
        </td>
        <td>
          {item.system}
        </td>
      </tr>
    ))
    return (
      <App>
         <table>
           <tbody>
             {rows}
           </tbody>
         </table>
      </App>
    );    
  }
}

export default Assets;
