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
  console.log(a, b, numeral(a).format('$0,0.0000'))
  return numeral(a).format('0,0.0000')
}

class PriceChart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      error: false,
      data: []
    };
  }

  componentDidMount() {
    const {
      symbol,
      currency
    } = this.props;

    const from = moment().add(-7, 'day').valueOf()
    marketApi.getHistoHour(symbol, currency, from)
      .then(response => {
        this.setState({
          loading: false,
          data: response.data
        })
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: true
        })
      })
  }
  render() {
    const { symbol, currency, btc_usd, eth_usd } = this.props;
    const { loading, data, error } = this.state;
    let cdata = data;

    if (loading) {
      return <CircularProgress />
    } 
    if (error) {
      return <div>error</div>;
    } 

    return (
      <div style={{ width: 150, height: 100}}>
        <ComposedChart width={150} height={100} data={cdata} syncId={`${symbol}_anyId`}
          margin={{top: 0, right: 0, left: 0, bottom: 0}}>
          <XAxis dataKey="time" hide={true}/>
          <Line dataKey='price' type='monotone' dot={false}/>
          <Tooltip formatter={formatter} labelFormatter={labelFormatter}/>
        </ComposedChart>
      </div>
    );
  }
}

import { calculateExchangeRate } from './module';
import { connect } from 'react-redux';

export default connect(
  state => ({
    btc_usd: calculateExchangeRate(state).btc_usd,
    eth_usd: calculateExchangeRate(state).eth_usd,
  })
)(PriceChart);
