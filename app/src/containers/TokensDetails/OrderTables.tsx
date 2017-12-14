
import * as React from 'react';

const OrderTables = ({ buyOrders }) => {
  const buyOrdersRows = buyOrders.map(order => (
    <tr>
      <td>{order.spotPrice}</td>
      <td>{order.amount}</td>
      <td>{order.spotPrice * order.amount}</td>
      <td>{order.amount}</td>
    </tr>
  ));

  return (
    <div className='columns'>
      <div className='column'>
        <h2>Buy orders</h2>
         <table className='table is-striped is-fullwidth'>
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
      </div>
      <div className='column'>
        <h2>Sell</h2>
      </div>
    </div>
  );
}

import { connect } from 'react-redux';
export default connect(
  state => ({
    buyOrders: state.chaingear.orders,
    sellOrders: state.chaingear.orders
  })
)(OrderTables);
