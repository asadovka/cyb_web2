
import * as React from 'react';
import Paper from 'material-ui/Paper';

const OrderTables = ({ buyOrders, sellOrders }) => {
  const buyOrdersRows = buyOrders.map(order => (
    <tr key={order.spotPrice}>
      <td>{order.spotPrice}</td>
      <td>{order.amount}</td>
      <td>{order.spotPrice * order.amount}</td>
      <td>{order.amount}</td>
    </tr>
  ));

  const sellOrdersRows = sellOrders.map(order => (
    <tr key={order.spotPrice}>
      <td>{order.spotPrice}</td>
      <td>{order.amount}</td>
      <td>{order.spotPrice * order.amount}</td>
      <td>{order.amount}</td>
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

import { connect } from 'react-redux';
export default connect(
  state => ({
    buyOrders: state.chaingear.orders.buyOrders.slice(-20),
    sellOrders: state.chaingear.orders.sellOrders.slice(-20)
  })
)(OrderTables);
