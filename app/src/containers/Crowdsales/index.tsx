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

import { Logo } from '../../components/AssetTable/';
var numeral = require('numeral');
import moment from 'moment'


class Crowdsales extends React.Component {

  componentDidMount() {
    this.props.showAllCrowdsales();   
  }

  render() {
    const {
      items
    } = this.props;

    // const cards = items.map(item => (
    //   <Card
    //     key={item.system}
    //     logo={getSystemLogoUrl(item, chaingearApi.imageUrl())}
    //     name={item.system}
    //     system={item.system}
    //     descriptions={item.descriptions && item.descriptions.headline}
    //     tokens_sold={item.crowdsales.tokens_sold}
    //   />
    // ))
    // <CardList>
    //        {cards}
    //      </CardList>
    const rows = items.map(item => (
      <tr>
        <td>
          <Logo to={`/crowdsales/${item.system}`}>
            <img width={50} src={getSystemLogoUrl(item, chaingearApi.imageUrl())}/>            
            <span>{item.system}</span>
          </Logo>
        </td>
        <td>
          {item.descriptions && item.descriptions.headline}
        </td>
        <td>
          {moment(item.crowdsales.end_date).format('YYYY.MM.DD')}
        </td>
        <td>
          {numeral(item.crowdsales.tokens_sold).format('0,0,0.00')}
        </td>
      </tr>
    ))
    return (
      <App>
         <table className='table is-striped is-fullwidth'>
           <thead>
             <tr>
               <th>system</th>
               <th>descriptions</th>
               <th>crowdsales</th>
               <th>tokens sold</th>
             </tr>
           </thead>
           <tbody>
             {rows}
           </tbody>
         </table>
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
