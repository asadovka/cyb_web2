
import * as React from 'react';
import Paper from 'material-ui/Paper';
var numeral = require('numeral');

const OrderTables = ({ buyOrders, sellOrders }) => {
  // console.log(buyOrders)
  const buyOrdersRows = buyOrders.map((order, indx) => (
    <tr key={indx}>
      <td>{numeral(order.spotPrice).format('$0,0,0.0000')}</td>
      <td>{numeral(order.amount).format('0,0,0.0000')}</td>
      <td>{numeral(order.sum).format('0,0,0.0000')}</td>
      <td>{order.count}</td>
      <td>{numeral(order.buy).format('0,0,0.0000')}</td>
    </tr>
  ));
  // const buyOrdersRows = [];

  const sellOrdersRows = sellOrders.map(order => (
    <tr key={order.spotPrice}>
      <td>{numeral(order.spotPrice).format('$0,0,0.0000')}</td>
      <td>{numeral(order.amount).format('0,0,0.0000')}</td>
      <td>{numeral(order.sum).format('0,0,0.0000')}</td>
      <td>{order.count}</td>
      <td>{numeral(order.sell).format('0,0,0.0000')}</td>
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
               <th>Sum(USD)</th>
               <th>count</th>
               <th>total</th>
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
               <th>Sum(USD)</th>
               <th>count</th>
               <th>total</th>
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
  calculateSellOrders,
  calculateBuyOrdersTotal,
  calculateSellOrdersTotal
} from '../../modules/chaingear';

import { connect } from 'react-redux';
export default connect(
  state => {
    // console.log('state.chaingear.orders.buyOrders', state.chaingear.orders.buyOrders)
    return {
      buyOrders: calculateBuyOrdersTotal(state),
      sellOrders: calculateSellOrdersTotal(state)
    }
  }
)(OrderTables);
