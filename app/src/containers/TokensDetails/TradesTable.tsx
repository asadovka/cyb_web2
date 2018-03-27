

import * as React from 'react';
var numeral = require('numeral');

import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from '../../components/Table/';


const TradesTable = ({ trades, btc_usd, eth_usd }) => {
  const rows = trades.map(item => (
    <TableRow key={item.tradeId + item.exchange}>
      <TableCell>
        {item.exchange}
      </TableCell>
      <TableCell>
        
      <span className={`tag ${item.type === 'SELL' ? 'is-success' : 'is-warning'}`} >{item.type}</span>
      </TableCell>
      <TableCell>
        {item.tradeId}
      </TableCell>
      <TableCell>
        {numeral(item.baseAmount).format('0,0,0.0000')}
      </TableCell>
      <TableCell>
        {numeral(item.spotPrice).format('$0,0,0.0000')}
      </TableCell>
      <TableCell>
        {numeral(item.quoteAmount).format('$0,0,0.0000000')}
      </TableCell>
    </TableRow>
  ))
  return (
    <div>
      <h2 className='title'>Trades</h2>
        <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Market</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
        </div>
    </div>
  )
}

import { connect } from 'react-redux';
import { calculateExchangeRate } from '../Tokens/module';

export default connect(
  state => ({
    btc_usd: calculateExchangeRate(state).btc_usd,
    eth_usd: calculateExchangeRate(state).eth_usd,
    trades: state.tokensDetails.trades
  })
)(TradesTable);