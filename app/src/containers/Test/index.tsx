import * as React from 'react';

import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from '../../components/Table/';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';

const {ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = require('recharts');

import {
  Switcher
} from '../../components/AppLayout/';


// const data = [{name: 'Page A', price: 590, volume: 800, amt: 1400},
//               {name: 'Page B', price: 868, volume: 967, amt: 1506},
//               {name: 'Page C', price: 1397, volume: 1098, amt: 989},
//               {name: 'Page D', price: 1480, volume: 1200, amt: 1228},
//               {name: 'Page E', price: 1520, volume: 1108, amt: 1100},
//               {name: 'Page F', price: 1400, volume: 680, amt: 1700}];

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    //https://min-api.cryptocompare.com/data/histohour?fsym=ETH&tsym=BTC&e=gdax
  }

  componentDidMount() {
    //this.props.showTokens();
    fetch('https://min-api.cryptocompare.com/data/histohour?fsym=ETH&tsym=USD&e=gdax')
      .then(response => response.json())
      .then(data => this.setState({ data: data.Data }))
  }
  
  render() {    
    const { data } = this.state;


    return (
      <div>
        <ComposedChart width={600} height={400} data={data} >
          <XAxis />
          <YAxis />
          <Tooltip/>
          <Line type='monotone'  dataKey='close' stroke='#ff7300' dot={false}/>
       </ComposedChart>
        <ComposedChart width={600} height={100} data={data} >
          <YAxis />
          <Tooltip active={true} />
          <Bar dataKey='volumeto' maxBarSize={5} fill='#413ea0'/>
       </ComposedChart>       
      </div>
    );
  }
}

import { showTokens, getRows, toggleMyToken, changeSearch } from './module';

import { connect } from 'react-redux';

export default connect(
  state => ({
    orders: getRows(state),
    myTokens: state.test.myTokens,
    search: state.test.search
  }),
  { showTokens, toggleMyToken, changeSearch }
)(Test);
