import * as React from "react";

import App from '../app/';
     
import {Injector} from "../../injector";
const {
  http
} = Injector.of();

class Assets extends React.Component {
  componentDidMount() {
    http.GET('https://raw.githubusercontent.com/cyberFund/chaingear/gh-pages/chaingear.json')
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
