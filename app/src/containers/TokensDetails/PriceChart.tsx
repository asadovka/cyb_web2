import * as React from "react";

import moment from 'moment';
import { ComposedChart, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';
import withRouter from "react-router/es/withRouter";

import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from '../../components/Table/';
import Checkbox from 'material-ui/Checkbox';
import { FormGroup, FormControlLabel } from 'material-ui/Form';

import {
   Tabs, Tab
} from '../../components/TokenDetails/';


var numeral = require('numeral');

var numeral = require('numeral');

function formatY(value) {
  return value > 1 
    ? numeral(value).format('0,0,0,0.00').replace(/,/g,' ')
    : numeral(value).format('0.0000000').replace(/,/g,' ')
}

const labelFormatter = (a, b, c) => {
  // console.log(a, b, c)
  return moment(a).format('DD.MM.YYYY HH:mm')
}

const  formatAxis = (interval) => (tickItem) =>{
  if (interval === '1m' || interval === '3m') return moment(tickItem).format('D MMM');

  var str = moment(tickItem).format('HH:mm');
  if (str === '00:00') {
    return  moment(tickItem).format('DD MMM');
  }
  return str;
}

// function minTickGap(interval) {
//   if (interval === 'All') return 60 * 24 * 30 * 6;
//   if (interval === '1y') return 60 * 24 * 30;

//   if (interval === '3m') return 60 * 24 * 30;
//   if (interval === '1m') return 60 * 24 * 2;

//   if  (interval === '7d') return 60 * 12;

//   return 60 * 2; //1day
// }

const getTicks = (interval) => {
  const ticks = [];
  if (interval === '1d') {
    const now = moment();
    const lastHour = now.startOf('hour').hour();
    let d = lastHour % 2 == 0 ? now.startOf('hour') : now.startOf('hour').add(-1, 'hour');
    while(d >  moment().add(-1, 'day')) {
      ticks.unshift(d.valueOf());
      d = d.add(-2, 'hour');
    }   
  }
  if (interval === '7d') {
    const now = moment();
    let lastDay = now.startOf('day');
    let d = now.startOf('day');
    while(d > moment().add(-7, 'day')) {
      ticks.unshift(d.valueOf());
      d = d.add(-12, 'hour');
    }
    
    d = now.startOf('day');
    while(d < moment()) {
      d = d.add(12, 'hour');
      ticks.push(d.valueOf());
    }
  }

  if (interval === '1m') {
    let before = moment().startOf('M');
    while(before > moment().add(-1, 'M')) {
      ticks.unshift(before.valueOf());
      before = before.add(-2, 'day');
    }
    
    let after = moment().startOf('M');
    while(after < moment()) {
      ticks.push(after.valueOf());
      after = after.add(2, 'day');
    }
  }

  // if (interval === '3m') {
  //   let before = moment().startOf('M').add(3, 'hour');
  //   console.log(before.valueOf(), before.utc().valueOf());
  //   while(before > moment().add(-1, 'M')) {
  //     ticks.unshift(before.valueOf());
  //     before = before.add(-2, 'day').add(3, 'hour');
  //   }
    
  //   let after = moment().startOf('M').add(3, 'hour');
  //   while(after < moment()) {
  //     ticks.push(after.valueOf());
  //     after = after.add(2, 'day');
  //   }
  // }
 console.log(ticks);

  return ticks;
}

const colors = [
  '#4c8cfe',
  '#6862db',
  '#61c8b0',
  '#e65f64',
  '#ff9f00',
]

class PriceChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avgPrice: true,
      scale: "auto",
      interval: '1d'
    }
    this.changeInterval = this.changeInterval.bind(this);
  }

  changeInterval(interval) {
    this.setState({ interval });
    const { symbol, base } = this.props;

    this.props.showTokensDetails(symbol, base, interval);
  }
  render () {
    const { interval } = this.state;

    const {
      avgPriceChart,
      multiPriceChart, 
      exchanges,
    } = this.props;

    const {
      avgPrice,
      scale
    } = this.state;

    let chart;


    // console.log(ticks)
    if (avgPrice) {
      chart = (
        <div>
          <div>
          <ComposedChart width={990} height={300} data={avgPriceChart} syncId="anyId"
                margin={{top: 10, right: 0, left: 0, bottom: 0}}>
            <XAxis 
              ticks={getTicks(interval)}
              tickFormatter={formatAxis(interval)} 
              dataKey="time"
              scale={scale}
              interval="preserveStartEnd"
            />
            <YAxis 
              type="number"  
              width={100} 
              orientation="right" 
              tickFormatter={formatY} 
              domain={[dataMin => (dataMin - (dataMin/100*5)), dataMax => (dataMax + (dataMax/100 * 5))]}
            />
            <Line dataKey='price' type='monotone' dot={false}  stroke="#82ca9d" isAnimationActive={false} />
            <Tooltip labelFormatter={labelFormatter} />
          </ComposedChart>
          </div>
      </div>
      );      
    } else {
      chart = (
        <div>
          <div>
          <ComposedChart width={990} height={300} data={multiPriceChart} syncId="anyId"
                margin={{top: 10, right: 0, left: 0, bottom: 0}}>
            <XAxis 
              ticks={getTicks(interval)}
              tickFormatter={formatAxis(interval)} 
              dataKey="time"
              scale={scale}
              interval="preserveStartEnd"
            />
            <YAxis 
              type="number"  
              width={100} 
              orientation="right" 
              tickFormatter={formatY} 
              domain={[dataMin => (dataMin - (dataMin/100*5)), dataMax => (dataMax + (dataMax/100 * 5))]}
            />
            {exchanges.map((e, index) => (
              <Line 
                dataKey={e} 
                key={e} 
                type='linear' 
                dot={false}  
                stroke={colors[index]} 
                isAnimationActive={false}
              />
            ))}
            
            <Tooltip labelFormatter={labelFormatter} />
          </ComposedChart>
          </div>
      </div>
      );      
    }

    return (
      <div>
        <Tabs value={interval} onChange={(e, v) => this.changeInterval(v)}>
          <Tab value='1d' label='1 day'  />
          <Tab value='7d' label='7 days'  />
          <Tab value='1m' label='1 month'  />
          <Tab value='3m' label='3 months'  />
          {/*<Tab value='1y' label='1y'  />
          <Tab value='all' label='all'  />*/}

        </Tabs>
        {/*<div>
          <button className={`button ${scale == 'auto' ? 'is-success' : ''}`}  onClick={() => this.setState({scale : 'auto'})}>line</button>
          <button className={`button ${scale == 'log' ? 'is-success' : ''}`}  onClick={() => this.setState({scale : 'log'})}>log</button>        
        </div>*/}
        {chart}
        <div>
          <FormControlLabel control={<Checkbox
              checked={avgPrice}
              onChange={() => this.setState({ avgPrice: !this.state.avgPrice })}
              value='avg'
            />}  label="Price (All)"/>
        </div>
      </div>
    );

  }
}

import { connect } from 'react-redux'

import { getMultiPriceChart, getExchanges, showTokensDetails } from './module';

export default withRouter(connect(
  (state, ownProps) => {
    return ({
      avgPriceChart: state.tokensDetails.avgPriceChart,
      multiPriceChart: getMultiPriceChart(state),
      exchanges: getExchanges(state),
      symbol: ownProps.params.symbol,
      base: ownProps.params.base,    
    });
  },
  { showTokensDetails }
)(PriceChart));
