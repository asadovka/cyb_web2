

import * as React from 'react';
var numeral = require('numeral');

import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from '../../components/Table/';


const TradesTable = ({ trades }) => {
  console.log(trades)
  const rows = trades.map(item => (
    <TableRow>
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
        {numeral(item.quoteAmount).format('$0,0,0.0000')}
      </TableCell>
    </TableRow>
  ))
  return (
    <div>
      <h2 className='title'>Trades</h2>
        <Paper>
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
        </Paper>
    </div>
  )
}

import { connect } from 'react-redux';

export default connect(
  state => ({
    trades: state.chaingear.trades
  })
)(TradesTable);
