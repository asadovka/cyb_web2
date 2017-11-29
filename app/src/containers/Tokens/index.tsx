import * as React from "react";

import App from '../app/';


import {Injector} from "../../injector";
const {
  http,
  marketApi
} = Injector.of();

import {ConfigConstants} from "../../config/ConfigConstants";
var config = require('./config.js')

import {
  Delta
} from '../../components/BlockchainStatics/';
import { Table, Logo, PriceInfo, NoInfo, PriceChart } from '../../components/AssetTable/';


const cgSystemLogoUrl = function (that, CYBER_CHAINGEAR_API) {
  var icon = (that.icon ? that.icon : that.system) || '';
  icon = icon.toString().toLowerCase();
  return CYBER_CHAINGEAR_API + icon + ".png";
};

class TokensPages extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      tokens: [],
      statistics: []
    };
  }
  componentDidMount() {
    Promise.all([
      http.GET(`${config.CYBER_CHAINGEAR_API}/api/tokens`),
      marketApi.getTokensStatistics()
    ]).then(data => {
      this.setState({
        tokens: data[0],
        statistics: data[1]
      })
    })
  }
  render() {
    const rows = this.state.tokens.map(item => {

      const statisticsRow = this.state.statistics.find(s => s.system === item.system);
      return (
        <tr key={item.system}>
          <td>
            <Logo>
              <img width={50} src={cgSystemLogoUrl(item, `${config.CYBER_CHAINGEAR_API}/logos/`)}/>            
              <span>{item.system}</span>
            </Logo>
          </td>
          <td>
            {statisticsRow ? (<PriceInfo>
              <div>
                <PriceChart
                  price_history={statisticsRow.price_history}
                  tiker_interval={1000 * 60 * 60 * 24 * 1 /*1 day*/}
                />
              </div>
              <div>
                <p>Price usd: {statisticsRow.price_usd}</p>
                <p>Price btc: {statisticsRow.price_bit}</p>
              </div>
            </PriceInfo>) : (
              <NoInfo />
            )}
          </td>
          <td>
            {statisticsRow ? <Delta value={statisticsRow.percent} /> : ' - '}
          </td>
        </tr>
      );
    })
    return (
      <App>
         <Table>
           <thead>
             <tr>
               <th>system</th>
               <th>price</th>
               <th>change per day</th>
             </tr>
           </thead>
           <tbody>
             {rows}
           </tbody>
         </Table>
      </App>
    );    
  }
}

export default TokensPages;
