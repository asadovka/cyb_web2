import * as React from "react";

import App from '../app/';
     
import {Injector} from "../../injector";
const {
  chaingearApi
} = Injector.of();


import { getSystemLogoUrl } from '../../modules/chaingear';

import { CardList, Card } from '../../components/Cards/';

import { connect } from 'react-redux';

import { showAllCrowdsales } from '../../modules/chaingear';

class Crowdsales extends React.Component<any, any> {

  componentDidMount() {
    this.props.showAllCrowdsales();   
  }

  render() {
    const {
      items
    } = this.props;

    const cards = items.map(item => (
      <Card
        key={item.system}
        logo={getSystemLogoUrl(item, chaingearApi.imageUrl())}
        name={item.system}
        system={item.system}
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

export default connect(
  state => ({
    items: state.chaingear.crowdsales.data
  }),
  { showAllCrowdsales }
)(Crowdsales);
