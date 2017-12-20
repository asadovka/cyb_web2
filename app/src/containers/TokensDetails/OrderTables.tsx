
import * as React from 'react';
import Paper from 'material-ui/Paper';
var numeral = require('numeral');

const OrderTables = ({ buyOrders, sellOrders }) => {
  // console.log(buyOrders)
  const buyOrdersRows = buyOrders.map(order => (
    <tr key={order.spotPrice}>
      <td>{numeral(order.spotPrice).format('$0,0,0.0000')}</td>
      <td>{order.amount}</td>
      <td>{order.spotPrice * order.amount}</td>
      <td>{order.amount}</td>
      <td>{order.count}</td>
    </tr>
  ));

  const sellOrdersRows = sellOrders.map(order => (
    <tr key={order.spotPrice}>
      <td>{numeral(order.spotPrice).format('$0,0,0.0000')}</td>
      <td>{order.amount}</td>
      <td>{order.spotPrice * order.amount}</td>
      <td>{order.amount}</td>
      <td>{order.count}</td>
    </tr>
  ));

  return (
    <div className='columns' style={{ marginTop: 50 }}>
      <div className='column'>
        <h2 className='title'>Buy orders</h2>
        <Paper style={{ minHeight: 600 }}>
         <table style={{ fontSize: '12px' }} className='table is-striped is-fullwidth'>
           <thead>
             <tr>
               <th>Price</th>
               <th>BTC?</th>
               <th>USD</th>
               <th>Sum(USD)</th>
               <th>count</th>
             </tr>
           </thead>
           <tbody>
             {buyOrdersRows}
           </tbody>
         </table>
         </Paper>
      </div>
      <div className='column'>
        <h2 className='title'>Sell orders</h2>
        <Paper style={{ minHeight: 600 }}>
         <table style={{ fontSize: '12px' }} className='table is-striped is-fullwidth'>
           <thead>
             <tr>
               <th>Price</th>
               <th>BTC?</th>
               <th>USD</th>
               <th>Sum(USD)</th>
               <th>count</th>
             </tr>
           </thead>
           <tbody>
             {sellOrdersRows}
           </tbody>
         </table>
         </Paper>
      </div>
    </div>
  );
}

import {
  calculateBuyOrders,
  calculateSellOrders
} from '../../modules/chaingear';

import { connect } from 'react-redux';
export default connect(
  state => {
    // console.log('state.chaingear.orders.buyOrders', state.chaingear.orders.buyOrders)
    return {
      buyOrders: calculateBuyOrders(state),
      sellOrders: calculateSellOrders(state)
    }
  }
)(OrderTables);
