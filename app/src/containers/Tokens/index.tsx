import * as React from "react";

import App from '../app/';

var config = require('./config.js')

import { Table, Logo, PriceInfo, NoInfo, PriceChart } from '../../components/AssetTable/';

import { connect } from 'react-redux';
import { showAllTokens, closeConnection, calculateRows } from './../../modules/chaingear';
var numeral = require('numeral');

class TokensPages extends React.Component<any, any> {

  componentWillUnmount() {
    this.props.closeConnection();
  }

  componentDidMount() {
    this.props.showAllTokens(); 
  }

  render() {
    const {
      rows
    } = this.props;

    const rowsComponents = rows.map((item, index) => {
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
             {rowsComponents}
           </tbody>
         </table>
      </App>
    );    
  }
}

export default connect(
  state => ({
    rows: calculateRows(state)
  }),
  { showAllTokens, closeConnection }
)(TokensPages);
