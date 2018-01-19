import * as React from "react";

import moment from 'moment';
import { ComposedChart, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';

import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from '../../components/Table/';
import Checkbox from 'material-ui/Checkbox';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
var numeral = require('numeral');


const labelFormatter = (a, b, c) => {
  // console.log(a, b, c)
  return moment(a).format('DD.MM.YYYY hh:mm')
}

function formatAxis(tickItem) {
  return moment(tickItem).format('DD MMM')
}

const colors = [
  '#82ca9d', 
  '#8884d8',
  'red',
  'yellow',
  'blule',
  'black',
]

class PriceChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avgPrice: false,
    }
  }
  render () {
    const {
      avgPriceChart,
      multiPriceChart, 
      exchanges,
    } = this.props;

    const {
      avgPrice
    } = this.state;

    let chart;
    if (avgPrice) {
      chart = (
        <div>
          <div>
          <ComposedChart width={900} height={300} data={avgPriceChart} syncId="anyId"
                margin={{top: 10, right: 0, left: 100, bottom: 0}}>
            <XAxis tickFormatter={formatAxis} dataKey="time"/>
            <YAxis   />
            <Line dataKey='price' type='monotone' dot={false}  stroke="#82ca9d" />
            <Tooltip labelFormatter={labelFormatter} />
          </ComposedChart>
          </div>
      </div>
      );      
    } else {
      chart = (
        <div>
          <div>
          <ComposedChart width={900} height={300} data={multiPriceChart} syncId="anyId"
                margin={{top: 10, right: 0, left: 100, bottom: 0}}>
            <XAxis tickFormatter={formatAxis} dataKey="time"/>
            <YAxis   />
            {exchanges.map((e, index) => (
              <Line dataKey={e} key={e} type='monotone' dot={false}  stroke={colors[index]} />
            ))}
            
            <Tooltip labelFormatter={labelFormatter} />
          </ComposedChart>
          </div>
      </div>
      );      
    }

    return (
      <div>
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

import { getMultiPriceChart, getExchanges } from './module';

export default connect(
  state => ({
    avgPriceChart: state.tokensDetails.avgPriceChart,
    multiPriceChart: getMultiPriceChart(state),
    exchanges: getExchanges(state),
  })
)(PriceChart);
