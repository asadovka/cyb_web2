import * as React from "react";

import App from '../app/';

var config = require('./config.js')

import { // TODO: move to seporate block
  Delta
} from '../../components/BlockchainStatics/';
import { Table, Logo, PriceInfo, NoInfo, PriceChart } from '../../components/AssetTable/';

import { connect } from 'react-redux';
import { getSystemLogoUrl, showAllTokens, TIKER_INTERVAL } from './../../modules/chaingear';
var numeral = require('numeral');

import streemApi from '../../api/MarketStreemApi';
const calcProcent = (a, b) => a === 0 ? 0 : ((a - b) / a  * 100);


const updateTokens = (rows, data) => {
  return rows
    .map(item => {
      if (item.symbol === data.tokensPair.base) {
        // console.log(item.symbol, item.price, data.price, calcProcent(item.price, data.price), data)
      }

      return item.symbol === data.tokensPair.base ? ({
        ...item,
        symbol: item.symbol,
        amount: data.quoteAmount,
        price: data.price,
        procent: calcProcent(item.price, data.price),
      }) : item;
    });   
}

const addTokens = (pairs, tokens, rows, currency) => {
  const _rows = [...rows];
  pairs.forEach(symbol => {
    const item = tokens.find(t => t.token.symbol === symbol);
    console.log(' > item ', symbol, item)
    if (!item) return null;

    const existToken = _rows.find(r => r.symbol === symbol);
    if (existToken) return null;

    if (!!item && !existToken) {
      _rows.push({
          symbol: symbol,
          system: item.system,
          logo: getSystemLogoUrl(item, `${config.CYBER_CHAINGEAR_API}/logos/`),
          price: 0,
          amount: 0,
          procent: 0,
          currency
      })  
    }
  })
 console.log(' pairs ', _rows)
 
  return _rows;
}

class TokensPages extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      BTC: 15000,
      ETH: 400
    };

    this.processPair = this.processPair.bind(this);
    this.initTokens = this.initTokens.bind(this);
  }




  initTokens(pairs, tokens, currency) {
    const usdPairs = pairs.filter(item => item.quote === currency).map(item => item.base);
    const _pairs = usdPairs.map(item => `"${item}_${currency}"`);

    this.setState({
      rows: addTokens(usdPairs, tokens, this.state.rows, currency)
    })

    const msg = `{"subscribe":"tickers","pairs":[${_pairs.join(',')}], "exchanges": ["ALL"], "window_durations": ["${60 * 1000}"] }`;

    streemApi.subscribeTickers(data => {
       this.setState({
        rows: updateTokens(this.state.rows, data)
      })
    }, msg)
  }

  processPair(pairs, tokens) {
    this.initTokens(pairs, tokens, 'USD');
    // this.initTokens(pairs, tokens, 'USDT');
    // this.initTokens(pairs, tokens, 'BTC');
    // this.initTokens(pairs, tokens, 'ETH');
  }

  componentWillUnmount() {
    streemApi.close();
  }

  componentDidMount() {
    this.props.showAllTokens().then(() => {
      streemApi.open("ws://93.125.26.210:32801", () => {
        streemApi.getPairs(data => this.processPair(data, this.props.tokens))
      })
    });    
  }

  render() {
    const {
      BTC,
      ETH
    } = this.state;
    const _rows = this.state.rows.map(item => {
      if (item.currency === 'BTC'){
        return {
          ...item,
          price: item.price * BTC,
          amount: item.amount * BTC
        }  
      }

      if (item.currency === 'ETH'){
        return {
          ...item,
          price: item.price * ETH,
          amount: item.amount * ETH
        }  
      }
      
      return item;
    });
    const rows = [].concat(_rows).sort((a, b) => b.amount - a.amount).map((item, index) => {
      const procent = item.procent;
      return (
        <tr key={index}>
          <td>
            <Logo to={`/tokens/${item.system}`}>
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
            }}>{numeral(item.price).format('$0,0,0.00')}</span>
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
             {rows}
           </tbody>
         </table>
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
