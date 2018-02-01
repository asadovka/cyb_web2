import * as React from 'react';

import {Injector} from "../../injector";
const {
  chaingearApi,
  marketApi
} = Injector.of();

import moment from 'moment'
var numeral = require('numeral');

import { CircularProgress } from 'material-ui/Progress';

import { ComposedChart, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';

const labelFormatter = (a, b) => {
  return moment(a).format('HH:mm DD MMM')
}

const formatter = (a, b) => {
  return numeral(a).format('0,0.0000')
}

class PriceChart extends React.Component {
  render() {
    const { loading, data, error, symbol, currency, btc_usd, eth_usd } = this.props;
    let cdata = data;

    if (loading) {
      return (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress />
          </div>
       );
    } 
    if (error) {
      return <div>error</div>;
    } 

    if (currency === 'BTC' && btc_usd) {
      cdata = data.map(item => ({ ...item, price: item.price * btc_usd }))
    }

    if (currency === 'ETH' && eth_usd) {
      cdata = data.map(item => ({ ...item, price: item.price * eth_usd }))
    }

    return (
      <div style={{ width: 150, height: 50, margin: '0 auto', border: '1px solid #ccc'}}>
        <ComposedChart width={150} height={50} data={cdata} syncId={`${symbol}_anyId`}
          margin={{top: 0, right: 0, left: 0, bottom: 0}}>
          <XAxis dataKey="time" hide={true} />
          <YAxis 
              type="number"  
              dataKey="price"
              hide={true}
              domain={[dataMin => (dataMin - (dataMin/100*5)), dataMax => (dataMax + (dataMax/100 * 5))]}
            />
          <Line isAnimationActive={false} dataKey='price' type='monotone' dot={false}/>
          <Tooltip formatter={formatter} labelFormatter={labelFormatter}/>
        </ComposedChart>
      </div>
    );
  }
}

import { calculateExchangeRate, getPriceData } from './module';
import { connect } from 'react-redux';

export default connect(
  (state, { symbol, currency }) => {
    const { loading, data, error } = getPriceData(state, symbol, currency);
    return {
      loading, data, error,
      btc_usd: calculateExchangeRate(state).btc_usd,
      eth_usd: calculateExchangeRate(state).eth_usd,
    }
  }
)(PriceChart);
