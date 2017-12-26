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
      sellOrders
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


    const types = ['basis' , 'basisClosed' , 'basisOpen' , 'linear' , 'linearClosed' , 'natural' , 'monotoneX' , 'monotoneY' , 'monotone' , 'step' , 'stepBefore' , 'stepAfter' ]
    const { type } = this.state;
    return (
      <div style={{
              marginTop: 50,
              marginBottom: 50
             }}>
      <div>
        <h4 className='title'>Order book:</h4>

        <Paper>
        <ComposedChart width={900} height={300} data={data} syncId="OrderBookChart"
              margin={{top: 10, right: 0, left: 0, bottom: 0}}>
          <XAxis  dataKey="spotPrice"/>
          <YAxis   />
          <Line dataKey="sell" type='stepBefore' dot={false} stroke="#82ca9d" />
          <Line dataKey="buy" type='stepBefore' dot={false} stroke="#8884d8" />
        </ComposedChart>
        <button>+</button>
        <button>-</button>
        </Paper>
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
    buyOrders: calculateBuyOrdersTotal(state, 10),
    sellOrders: calculateSellOrdersTotal(state, 10)
  })
)(OrderBookChart);

