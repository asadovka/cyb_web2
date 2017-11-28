import * as React from "react";

import App from '../app/';
     
import {Injector} from "../../injector";
const {
  http
} = Injector.of();

import {ConfigConstants} from "../../config/ConfigConstants";
var config = require('./config.js')


import { Table } from '../../components/AssetTable/'

const cgSystemLogoUrl = function (that, CYBER_CHAINGEAR_API) {
  var icon = (that.icon ? that.icon : that.system) || '';
  icon = icon.toString().toLowerCase();
  return CYBER_CHAINGEAR_API + icon + ".png";
};

class Assets extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    http.GET(`${config.CYBER_CHAINGEAR_API}/api/tokens`)
      .then(data => {
        console.log(' data ', data);
        this.setState({
          items: data
        })
      })    
  }
  render() {
    const rows = this.state.items.map(item => (
      <tr>
        <td>
          <img width={50} src={cgSystemLogoUrl(item, `${config.CYBER_CHAINGEAR_API}/logos/`)}/>
        </td>
        <td>
          {item.system}
        </td>
      </tr>
    ))
    return (
      <App>
         <Table>
           <tbody>
             {rows}
           </tbody>
         </Table>
      </App>
    );    
  }
}

export default Assets;
