import * as React from "react";
import withRouter from "react-router/es/withRouter";

import App from '../app/';
     
import { connect } from 'react-redux';

import {Injector} from "../../injector";
const {
  chaingearApi
} = Injector.of();

import { showTokensDetails, getSystemLogoUrl } from '../../modules/chaingear';


import {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
const data = [
      {name: 'Page A', uv: 4000, pv: 9000},
      {name: 'Page B', uv: 3000, pv: 7222},
      {name: 'Page C', uv: 2000, pv: 6222},
      {name: 'Page D', uv: 1223, pv: 5400},
      {name: 'Page E', uv: 1890, pv: 3200},
      {name: 'Page F', uv: 2390, pv: 2500},
      {name: 'Page G', uv: 3490, pv: 1209},
];
const PriceChart = React.createClass({
  render () {
    return (
      <div>
        <h4>A demo of synchronized AreaCharts</h4>

        <LineChart width={600} height={200} data={data} syncId="anyId"
              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Line type='monotone' dataKey='pv' stroke='#82ca9d' fill='#82ca9d' />
          <Brush />
        </LineChart>

    </div>
    );
  }
});

class TokensDetails extends React.Component<any, any> {
  componentDidMount() {
    const { system } = this.props;
    this.props.showTokensDetails(system);
  }
  render() {
    const { crowdsalesDetails } = this.props;
    console.log(' >> ', crowdsalesDetails)
    return (
      <App>
         {crowdsalesDetails.system ? (
           <div>
             <div>
               <img width={50} src={getSystemLogoUrl(crowdsalesDetails, chaingearApi.imageUrl())} />
               <h2 className='title'>{crowdsalesDetails.system}</h2>
               <h3 className='subtitle'>{crowdsalesDetails.token.symbol}{' '}{crowdsalesDetails.descriptions.state}{' '}{crowdsalesDetails.descriptions.system_type}</h3>
             </div>
             <div>
               statistic???
             </div>
             <div>
               <h2 className='title'>Links:</h2>
               <div className='tags'>
               {crowdsalesDetails.links.map(link => (
                 <a className='tag' href={link.url}>
                   {link.icon && <img style={{ marginRight: 10 }} width={20} src={chaingearApi.imageUrl() + link.icon} />} {link.name}
                 </a>
                ))}
                 </div>
             </div>
             <div>
               <PriceChart />
             </div>
             <div>
               <h2 className='title'>Specification</h2>
             </div>
             <div>
               <h2 className='title'>First Price</h2>
             </div>
             <div>
               You can improve <a href={`https://github.com/cyberFund/chaingear/blob/gh-pages/sources/${crowdsalesDetails.system}/${crowdsalesDetails.system}.toml`}>{crowdsalesDetails.system}'s</a> page on Github.
             </div>
           </div>
         ) : (
           <div>
             loading...
           </div>
         )}
      </App>
    );    
  }
}

export default withRouter(connect(
  (state, ownProps) => ({
    system: ownProps.routeParams.system,
    crowdsalesDetails: state.chaingear.tokensDetails.data
  }),
  { showTokensDetails }
)(TokensDetails));
