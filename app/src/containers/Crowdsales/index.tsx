import * as React from "react";

import App from '../app/';
     
import {Injector} from "../../injector";
const {
  http
} = Injector.of();

import {ConfigConstants} from "../../config/ConfigConstants";
var config = require('./config.js')


const cgSystemLogoUrl = function (that, CYBER_CHAINGEAR_API) {
  var icon = (that.icon ? that.icon : that.system) || '';
  icon = icon.toString().toLowerCase();
  return CYBER_CHAINGEAR_API + icon + ".png";
};

import { CardList, Card } from '../../components/Cards/';

class Crowdsales extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    http.GET(`${config.CYBER_CHAINGEAR_API}/api/crowdsales`)
      .then(data => {
        console.log(' data ', data);
        this.setState({
          items: data
        })
      })    
  }
  render() {
    const cards = this.state.items.map(item => (
      <Card
        logo={cgSystemLogoUrl(item, `${config.CYBER_CHAINGEAR_API}/logos/`)}
        name={item.system}
        descriptions={item.descriptions && item.descriptions.headline}
        tokens_sold={item.crowdsales.tokens_sold}
      />
    ))
    return (
      <App>
         <CardList>
           {cards}
         </CardList>
      </App>
    );    
  }
}

export default Crowdsales;
