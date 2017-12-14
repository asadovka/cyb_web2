

import * as React from 'react';

const TradesTable = ({ trades }) => {
  console.log(trades)
  const rows = trades.map(item => (
    <tr>
      <td>
        {item.exchange}
      </td>
      <td>
        
      <span className={`tag ${item.type === 'SELL' ? 'is-success' : 'is-warning'}`} >{item.type}</span>
      </td>
      <td>
        {item.tradeId}
      </td>
      <td>
        {item.quoteAmount}
      </td>
      <td>
        {item.spotPrice}
      </td>
      <td>
        {item.baseAmount}
      </td>
    </tr>
  ))
  return (
    <div>
      <h2 className='title'>Trades</h2>
              <table className='table is-striped is-fullwidth'>
          <thead>
            <tr>
              <th>Market</th>
              <th>Type</th>
              <th>ID</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
    </div>
  )
}

import { connect } from 'react-redux';

export default connect(
  state => ({
    trades: state.chaingear.trades
  })
)(TradesTable);
