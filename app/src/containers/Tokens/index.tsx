import * as React from "react";

import App from '../app/';

var config = require('./config.js')

import { Table, Logo, PriceInfo, NoInfo, PriceChart } from '../../components/AssetTable/';

import { connect } from 'react-redux';
import { showAllTokens, closeConnection, calculateRows, calculateExchangeRate } from './../../modules/chaingear';
var numeral = require('numeral');

const ExchangeRate = ({ btc_usd, eth_usd }) => (
  <div className='field is-grouped is-grouped-multiline'>
    <div className='control'>
    <div className="tags has-addons">
      <span className="tag">BTC</span>
      <span className="tag is-primary">{numeral(btc_usd).format('$0,0,0.00')}</span>
    </div>
    </div>
    <div className='control'>
    <div className="tags has-addons">
      <span className="tag">ETH</span>
      <span className="tag is-primary">{numeral(eth_usd).format('$0,0,0.00')}</span>
    </div>
    </div>
  </div>
)

class TokensPages extends React.Component<any, any> {

  componentWillUnmount() {
    this.props.closeConnection();
  }

  componentDidMount() {
    this.props.showAllTokens(); 
  }

  render() {
    const {
      rows,
      btc_usd, eth_usd
    } = this.props;

    const rowsComponents = rows.map((item, index) => {
      const procent = item.procent;
      return (
        <tr key={index}>
          <td>
            <Logo to={`/tokens/${item.symbol}`}>
              <img width={50} src={item.logo}/>            
              <span>{item.system}</span>
              <span style={{ marginLeft: 20 }} className={`tag ${(item.currency === 'USD' || item.currency === 'USDT') ? 'is-success' : 'is-warning'}`}>
                {item.currency}
              </span>
            </Logo>

          </td>
          <td>
            <span style={{
              color: procent === 0 ? '#000' : (procent < 0 ? 'red' : 'green')
            }}>{numeral(item.price).format('$0,0,0.0000')}</span>
          </td>
          <td>
            {numeral(item.amount).format('$0,0,0.00')}
          </td>
          <td>
            {numeral(item.procent).format('0.000%')}
          </td>
        </tr>
      );
    })
    return (
      <App>
        <ExchangeRate 
          btc_usd={btc_usd} 
          eth_usd={eth_usd}
        />
         <table className='table is-striped is-fullwidth'>
           <thead>
             <tr>
               <th>system</th>
               <th>price</th>
               <th>amount</th>
               <th>%</th>
             </tr>
           </thead>
           <tbody>
             {rowsComponents}
           </tbody>
         </table>
      </App>
    );    
  }
}

export default connect(
  state => ({
    rows: calculateRows(state),
    btc_usd: calculateExchangeRate(state).btc_usd,
    eth_usd: calculateExchangeRate(state).eth_usd,
  }),
  { showAllTokens, closeConnection }
)(TokensPages);
