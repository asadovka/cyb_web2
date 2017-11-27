import * as React from "react";

import App from '../app/';
     
import {Injector} from "../../injector";
const {
  http
} = Injector.of();

class Assets extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    //https://raw.githubusercontent.com/cyberFund/chaingear/gh-pages/chaingear.json
    http.GET('/api/tokens')
      .then(data => {
        this.setState({
          items: data
        })
      })
    
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
