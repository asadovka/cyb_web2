import * as React from "react";

import App from '../app/';

var config = require('./config.js')

import { // TODO: move to seporate block
  Delta
} from '../../components/BlockchainStatics/';
import { Table, Logo, PriceInfo, NoInfo, PriceChart } from '../../components/AssetTable/';

import { connect } from 'react-redux';
import { getSystemLogoUrl, showAllTokens, TIKER_INTERVAL } from './../../modules/chaingear';

class TokensPages extends React.Component<any, any> {
  componentDidMount() {
    this.props.showAllTokens();
  }

  render() {
    const {
      tokens,
      statistics,
    } = this.props;

    const rows = tokens.map(item => {
      const statisticsRow = statistics.find(s => s.system === item.system);
      return (
        <tr key={item.system}>
          <td>
            <Logo to={`/tokens/${item.system}`}>
              <img width={50} src={getSystemLogoUrl(item, `${config.CYBER_CHAINGEAR_API}/logos/`)}/>            
              <span>{item.system}</span>
            </Logo>
          </td>
          <td>
            {statisticsRow ? (<PriceInfo>
              <div>
                <PriceChart
                  price_history={statisticsRow.price_history}
                  tiker_interval={TIKER_INTERVAL}
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

export default connect(
  state => ({
    tokens: state.chaingear.tokens.data.tokens,
    statistics: state.chaingear.tokens.data.statistics
  }),
  { showAllTokens }
)(TokensPages);
