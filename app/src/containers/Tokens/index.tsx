import * as React from "react";

import App from '../app/';

var config = require('./config.js')

import { // TODO: move to seporate block
  Delta
} from '../../components/BlockchainStatics/';
import { Table, Logo, PriceInfo, NoInfo, PriceChart } from '../../components/AssetTable/';

import { connect } from 'react-redux';
import { getSystemLogoUrl, showAllTokens, TIKER_INTERVAL } from './../../modules/chaingear';

let socket;

class TokensPages extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };

    // this.updateState = this.updateState.bind(this);
    this.processTickers = this.processTickers.bind(this);
    this.processPair = this.processPair.bind(this);
    this.buildInitRows = this.buildInitRows.bind(this);
  }


  processTickers(data) {
    const rows = this.state.rows
      .map(item => item.symbol === data.tokensPair.base ? ({
        ...item,
        symbol: item.symbol,
        amount: data.quoteAmount,
        price: data.price,
        procent: item.price - data.price
      }) : item);

    this.setState({
        rows
      })
  }

  buildInitRows(usdPairs, tokens) {
    const rows = usdPairs.map(symbol => {
      const item = tokens.find(t => t.token.symbol === symbol);
      if (!item) return null;

      return {
          symbol: symbol,
          system: item.system,
          logo: getSystemLogoUrl(item, `${config.CYBER_CHAINGEAR_API}/logos/`),
          price: 0,
          amount: 0,
          procent: 0
      }
    }).filter(_ => !!_);

    console.log(' rows >> ', rows)
    this.setState({
      rows
    })
  }

  processPair(pairs) {
     // console.log(' pairs ', pairs);
    const usdPairs = pairs.filter(item => item.quote === 'USD').map(item => item.base);
    console.log(' usdPairs> ', usdPairs);
    const _pairs = usdPairs.map(item => `"${item}_USD"`);
    const msg = `{"subscribe":"tickers","pairs":[${_pairs.join(',')}] }`;
    socket.send(msg);
    console.log('get tikers >> ', msg);


    setTimeout(() => { //TODO: move all logic in module and use promise
      this.buildInitRows(usdPairs, this.props.tokens);
    }, 3000);
  }

  componentDidMount() {
    this.props.showAllTokens();

    socket = new WebSocket("ws://93.125.26.210:32801");

    socket.onopen = () => {
       socket.send('{"get":"pairs"}');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'pairs') {
        this.processPair(data.value)
      }
      if (data.type === 'tickers') {
        this.processTickers(data.value)
      }
    };
    
  }

  render() {

    const rows = this.state.rows.map((item, index) => {

      return (
        <tr key={index}>
          <td>
            <Logo to={`/tokens/${item.system}`}>
              <img width={50} src={item.logo}/>            
              <span>{item.system}</span>
            </Logo>
          </td>
          <td>
            {item.price}
          </td>
          <td>
            {item.amount}
          </td>
          <td>
            {item.procent}
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
