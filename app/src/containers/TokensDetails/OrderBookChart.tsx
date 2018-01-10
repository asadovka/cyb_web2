import * as React from "react";

import moment from 'moment';
import { ComposedChart, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';

import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from '../../components/Table/';

var numeral = require('numeral');

const CustomeTooltip = ({ active, payload, label }) => {
  if (!active) return null;

  return (
    <div>
      tooltip
    </div>
  )
}

const labelFormatter = (a, b) => {
  return moment(a).format('DD.MM.YYYY')
}

function formatAxis(tickItem) {
  return moment(tickItem).format('DD MMM')
}

const OrderBookChart = React.createClass({
  getInitialState(){
    return {
      type: 'step'
    }
  },
  change(e) {
    this.setState({
      type: e.target.value
    })
  },
  render () {
    const {
      buyOrders,
      sellOrders,

      buyOrdersGDAX,
      sellOrdersGDAX
    } = this.props;

    let data = [];

    // let data = buyOrders.map(item => ({
    //   buy: item.sum,
    //   spotPrice: item.spotPrice,
    // }));

    // data = data.concat(sellOrders.map(item => ({
    //   sell: item.sum,
    //   spotPrice: item.spotPrice,
    // })))

    data  = [...data, ...buyOrders];
    data  = [...data, ...sellOrders];
    // data = [...data, ...buyOrdersGDAX.map(item => ({ spotPrice: item.spotPrice, sellGDAX: item.buy }))];
    // data = [...data, ...sellOrdersGDAX.map(item => ({ spotPrice: item.spotPrice, buyGDAX: item.sell }))];

    console.log(data)


          // <Line dataKey="sell" type='stepAfter' data={sellOrdersGDAX} name='GDAX' dot={false} stroke="red" />
          // <Line dataKey="buy" type='stepAfter' data={buyOrdersGDAX} name='GDAX' dot={false} stroke="green" />


    const types = ['basis' , 'basisClosed' , 'basisOpen' , 'linear' , 'linearClosed' , 'natural' , 'monotoneX' , 'monotoneY' , 'monotone' , 'step' , 'stepBefore' , 'stepAfter' ]
    const { type } = this.state;

    const exchanges = [
      { 
        name: 'HitBtc', 
        stroke: 'red',
        field: 'buy',
        data: [
          ...buyOrders,
          ...sellOrders
        ]
      },
      { 
        name: 'HitBtc', 
        stroke: 'green',
        field: 'sell',
        data: [
          ...buyOrders,
          ...sellOrders
        ]
      },
      { 
        name: 'GDAX', 
        stroke: 'yellow',
        field: 'buy',
        data: [
          ...buyOrdersGDAX,
          ...sellOrdersGDAX
        ]
      },
      { 
        name: 'GDAX', 
        stroke: 'blue',
        field: 'sell',
        data: [
          ...buyOrdersGDAX,
          ...sellOrdersGDAX
        ]
      }
    ]
    return (
      <div style={{
              marginTop: 50,
              marginBottom: 50
             }}>
      <div>
        <h4 className='title'>Market depth:</h4>

        <div>
        <LineChart width={900} height={300} >
          <XAxis  data={exchanges[0].data} dataKey="spotPrice"  domain={['dataMin', 'dataMax']}/>
          <YAxis  />
          {exchanges.map(exchange => (
            <Line 
              dataKey={exchange.field} 
              type='stepAfter' 
              data={exchange.data} 
              name={exchange.name} 
              key={exchange.name + exchange.field} 
              stroke={exchange.stroke}
              dot={false}  
            />
          ))}
        </LineChart>
        <button>+</button>
        <button>-</button>
        </div>
    </div>
    </div>
    );
  }
});

import { connect } from 'react-redux'
import {
  calculateBuyOrders,
  calculateSellOrders,
  calculateBuyOrdersTotal,
  calculateSellOrdersTotal
} from './module';

export default connect(
  state => ({
    buyOrders: calculateBuyOrdersTotal(state, 10, 'HitBtc'),
    sellOrders: calculateSellOrdersTotal(state, 10, 'HitBtc'),

    buyOrdersGDAX: calculateBuyOrdersTotal(state, 10, 'GDAX'),
    sellOrdersGDAX: calculateSellOrdersTotal(state, 10, 'GDAX')      
  })
)(OrderBookChart);

