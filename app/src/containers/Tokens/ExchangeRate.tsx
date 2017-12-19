import * as React from "react";
var numeral = require('numeral');
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';
import { calculateExchangeRate } from './../../modules/chaingear';

const ExchangeRate = ({ btc_usd, eth_usd }) => (
  <div className='field is-grouped is-grouped-multiline'>
    <div className='control'>
    {/*<div className="tags has-addons">
      <span className="tag">BTC</span>
      <span className="tag is-primary">{numeral(btc_usd).format('$0,0,0.00')}</span>
    </div>*/}
    <Chip avatar={<Avatar>BTC</Avatar>} label={numeral(btc_usd).format('$0,0,0.00')}/>
    </div>
    <div className='control'>
    {/*<div className="tags has-addons">
      <span className="tag">ETH</span>
      <span className="tag is-primary">{numeral(eth_usd).format('$0,0,0.00')}</span>
    </div>*/}
    <Chip avatar={<Avatar>ETH</Avatar>} label={numeral(eth_usd).format('$0,0,0.00')}/>
    </div>
  </div>
)

export default connect(
  state => ({
    btc_usd: calculateExchangeRate(state).btc_usd,
    eth_usd: calculateExchangeRate(state).eth_usd,
  })
)(ExchangeRate);
