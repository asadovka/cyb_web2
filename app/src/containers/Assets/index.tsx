import * as React from "react";

import App from '../app/';
     
import {Injector} from "../../injector";
const {
  http
} = Injector.of();

class Assets extends React.Component {
  componentDidMount() {
    //https://raw.githubusercontent.com/cyberFund/chaingear/gh-pages/chaingear.json
    http.GET('/api/tokens')
      .then(data => {
        console.log(data)
      })
    
  }
  render() {
    return (
      <App>
       Assets
      </App>
    );    
  }
}

export default Assets;
