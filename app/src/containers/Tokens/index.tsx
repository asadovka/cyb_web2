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
  constructor(props) {
    super(props);
    this.state = {
      avalibleTokens: []
    };
  }

  componentDidMount() {
    this.props.showAllTokens();

    var socket = new WebSocket("ws://93.125.26.210:32801");

    socket.onopen = function() {
       socket.send('{"get":"pairs"}');
      // alert("Соединение установлено.");
    };

    let count = 0;
    socket.onmessage = (event) => {

      if (count > 0) {
        console.log('>>', event)
        return;
      }
      const data = JSON.parse(event.data);
      const avalibleTokens = data.filter(item => item.quote === 'USD').map(item => item.base);
      console.log(' avalibleTokens> ', avalibleTokens);
      this.setState({
        avalibleTokens
      })
      let pairs = avalibleTokens.map(item => `"${item}_USD"`);
      const msg = `{"subscribe":"tickers","pairs":[${pairs.join(',')}] }`;
      socket.send(msg);
      count++;
      console.log('msg >> ', msg)
    };

    
  }

  render() {
    const {
      tokens,
      statistics,
    } = this.props;

    const {
      avalibleTokens
    } = this.state;

    const rows = tokens.map(item => {
      const statisticsRow = avalibleTokens.find(s => s === item.token.symbol);
      if (!statisticsRow) return null;

      return (
        <tr key={item.system}>
          <td>
            <Logo to={`/tokens/${item.system}`}>
              <img width={50} src={getSystemLogoUrl(item, `${config.CYBER_CHAINGEAR_API}/logos/`)}/>            
              <span>{item.system}</span>
            </Logo>
          </td>
          {/*<td>
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
          </td>*/}
          <td>
            -
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
               {/*<th>price</th>*/}
               <th>price</th>
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
