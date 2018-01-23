import * as React from "react";
var numeral = require('numeral');
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';
import { calculateExchangeRate } from './module';

import { ExchangeRate, ExchangeRateItem, Label, Value } from '../../components/ExchangeRate/';
// const ExchangeRate = ({ btc_usd, eth_usd, usdt_usd }) => (
//   <div className='field is-grouped is-grouped-multiline'>
//     <div className='control'>
//     <Chip avatar={<Avatar>BTC</Avatar>} label={numeral(btc_usd).format('$0,0,0.00')}/>
//     </div>
//     <div className='control'>
//     <Chip avatar={<Avatar>ETH</Avatar>} label={numeral(eth_usd).format('$0,0,0.00')}/>
//     </div>
//   </div>
// )

const ExchangeRateContainer = ({ btc_usd, eth_usd, usdt_usd }) => (
  <ExchangeRate >
    <ExchangeRateItem>
      <Label>BTC</Label>
      <Value>{numeral(btc_usd).format('$0,0,0.00')}</Value>
    </ExchangeRateItem>
    <ExchangeRateItem>
      <Label>ETH</Label>
      <Value>{numeral(eth_usd).format('$0,0,0.00')}</Value>
    </ExchangeRateItem>
  </ExchangeRate>
)

export default connect(
  state => ({
    btc_usd: calculateExchangeRate(state).btc_usd,
    eth_usd: calculateExchangeRate(state).eth_usd,
    usdt_usd: calculateExchangeRate(state).usdt_usd
  })
)(ExchangeRateContainer);
