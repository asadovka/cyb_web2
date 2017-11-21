import * as React from "react";

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import App from '../app/';
// import io from 'socket.io-client';

const SimpleLineChart = ({ data }) => {
  return (
    <LineChart width={600} height={300} data={data}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
     <XAxis dataKey="name"/>
     <YAxis/>
     <CartesianGrid strokeDasharray="3 3"/>
     <Tooltip/>
     <Legend />
     <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
     <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
     </LineChart>
  );
}     

class Analitics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
        {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
        {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
        {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
        {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
        {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
        {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
      ]
    };
    this.test = this.test.bind(this);
  }
  test() {
    this.setState({
      data: this.state.data.concat([
        {name: 'Page Z', uv: 3490, pv: 4300, amt: 2100},
       ])
    })
  }
  componentDidMount() {
    // var socket = require('socket.io-client')('http://localhost:8082');
    // socket.on('connect', function(){
    //   debugger
    // });
    // socket.on('event', function(data){
    //   debugger
    // });
    var socket = new WebSocket("ws://localhost:18080");

    socket.onmessage = function(event) {
      console.log("Получены данные " + event.data);
    };

    socket.onopen = function() {
      alert("Соединение установлено.");
    };
  }
  render() {
    return (
      <App>
        <SimpleLineChart data={this.state.data} />
        <button onClick={this.test}>test</button>
      </App>
    );    
  }
}

export default Analitics;
