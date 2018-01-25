import * as React from "react";

import moment from 'moment';
import { ComposedChart, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';
import withRouter from "react-router/es/withRouter";

import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from '../../components/Table/';
import Checkbox from 'material-ui/Checkbox';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
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
  if (interval === '7d') return moment(tickItem).format('DD MMM');

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
  const now = moment();
  const lastHour = now.startOf('hour').hour();
  let d = lastHour % 2 == 0 ? now.startOf('hour') : now.startOf('hour').add(-1, 'hour');
  while(d > (interval === '1d' ? moment().add(-1, 'day') : moment().add(-7, 'day'))) {
   // console.log(d)
    ticks.unshift(d.valueOf());
    d = d.add(interval === '1d' ? -2 : -24, 'hour');
  }
  console.log(ticks)
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
      avgPrice: false,
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
      avgPrice
    } = this.state;

    let chart;


    // console.log(ticks)
    // if (avgPrice) {
    //   chart = (
    //     <div>
    //       <div>
    //       <ComposedChart width={1100} height={300} data={avgPriceChart} syncId="anyId"
    //             margin={{top: 10, right: 0, left: 100, bottom: 0}}>
    //         <XAxis tickFormatter={formatAxis} dataKey="time"/>
    //         <YAxis   />
    //         <Line dataKey='price' type='monotone' dot={false}  stroke="#82ca9d" />
    //         <Tooltip labelFormatter={labelFormatter} />
    //       </ComposedChart>
    //       </div>
    //   </div>
    //   );      
    // } else {
      chart = (
        <div>
          <div>
          <ComposedChart width={1100} height={300} data={multiPriceChart} syncId="anyId"
                margin={{top: 10, right: 0, left: 100, bottom: 0}}>
            <XAxis 
              ticks={getTicks(interval)}
              tickFormatter={formatAxis(interval)} 
              dataKey="time"
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
    // }

    return (
      <div>
        <div>
          <button className={`button ${interval == '1d' ? 'is-success' : ''}`} onClick={() => this.changeInterval('1d')}>1d</button>
          <button className={`button ${interval == '7d' ? 'is-success' : ''}`} onClick={() => this.changeInterval('7d')}>7d</button>
          {/*<button className={`button ${interval == '1m' ? 'is-success' : ''}`}  onClick={() => this.changeInterval('1m')}>1m</button>
          <button className={`button ${interval == '3m' ? 'is-success' : ''}`}  onClick={() => this.changeInterval('3m')}>3m</button>
          <button className={`button ${interval == '1y' ? 'is-success' : ''}`}  onClick={() => this.changeInterval('1y')}>1y</button>
          <button className={`button ${interval == 'all' ? 'is-success' : ''}`}  onClick={() => this.changeInterval('all')}>ALL</button>*/}
        </div>
        {chart}
        <div>
          <FormControlLabel control={<Checkbox
              checked={avgPrice}
              onChange={() => this.setState({ avgPrice: !this.state.avgPrice })}
              value='avg'
            />}  label="avg price"/>
        </div>
      </div>
    );

  }
}

import { connect } from 'react-redux'

import { getMultiPriceChart, getExchanges, showTokensDetails } from './module';

export default withRouter(connect(
  (state, ownProps) => {
    console.log(ownProps)
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
