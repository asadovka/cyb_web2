import * as React from "react";


import { Logo, PriceInfo, NoInfo } from '../../components/AssetTable/';

import { connect } from 'react-redux';
var numeral = require('numeral');


import Table, { TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '../../components/Table/';

import { calculateRows, changeSearch, toggleMyToken, getMyTokens } from './module';

import PriceChart from './PriceChart';
import Search from './Search';

import Paper from 'material-ui/Paper';

import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

const TokenRows = ({ item, myTokens, toggleMyToken }) => {
  const procent = item.procent;
  return (
    <TableRow >
      <TableCell padding="checkbox">
        <Checkbox 
          checked={myTokens.indexOf(item.symbol) !== -1}
          onChange={(event, checked) => {
            toggleMyToken(item.symbol, checked);
          }}
        />
      </TableCell>
      <TableCell>
        <Logo to={`/tokens/${item.symbol}-${item.currency}`}>
          <img width={50} src={item.logo}/>            
          <span>{item.system}</span>
          <span style={{ marginLeft: 20 }} className={`tag ${(item.currency === 'USD' || item.currency === 'USDT') ? 'is-success' : 'is-warning'}`}>
            {item.currency}
          </span>
        </Logo>
      </TableCell>
      <TableCell padding="none">
        {numeral(item.price * item.supply).format('$0,0,0,0.0000')}
      </TableCell>
      <TableCell padding="none">
        <span style={{
          color: procent === 0 ? '#000' : (procent < 0 ? 'red' : 'green')
        }}>{numeral(item.price).format('$0,0,0.0000')}</span>
      </TableCell>
      <TableCell padding="none">
        {numeral(item.amount).format('$0,0,0.00')}
      </TableCell>
      <TableCell padding="none">
        {numeral(item.supply).format('0,0,0,0.00') }&nbsp;{item.symbol}
      </TableCell>
      <TableCell padding='none'>
        {numeral(item.procent).format('0.00000%')}
      </TableCell>
      <TableCell padding='none'>
        <PriceChart
          symbol={item.symbol} 
          currency={item.currency}
        />
      </TableCell>
    </TableRow>
  );
}

const TableHeader = () => (
  <TableHead>
     <TableRow>
       <TableCell padding="checkbox">                
       </TableCell>
       <TableCell style={{ textAlign: 'center'}}>token</TableCell>
       <TableCell>market&nbsp;cap</TableCell>
       <TableCell>price</TableCell>
       <TableCell><TableSortLabel active={true}>volume by pair</TableSortLabel></TableCell>               
       <TableCell>supply</TableCell>               
       <TableCell style={{ width: '10%'}}>%&nbsp;(24h)</TableCell>
       <TableCell style={{ width: '20%'}}>price graph (7d)</TableCell>
     </TableRow>
   </TableHead>
)

class TokensTable extends React.Component {

  render() {
    const {
      rows,
      myTokens,
      toggleMyToken,
      myTokensRows
    } = this.props;

    const rowsComponents = rows.map((item, index) => (
      <TokenRows
        item={item}
        myTokens={myTokens}
        toggleMyToken={toggleMyToken}
        key={item.symbol}
      />
    ))
    const myRowsComponents = myTokensRows.map((item, index) => (
      <TokenRows
        item={item}
        myTokens={myTokens}
        toggleMyToken={toggleMyToken}
        key={item.symbol}
      />
    ))

    return (
      <Paper>          
        <Table>
          <TableHeader /> 
          <TableBody>
             {myRowsComponents}
          </TableBody>
        </Table>
          <Divider />

        <Table>
          <TableHeader /> 
          <TableBody>
            {rowsComponents}
          </TableBody>
         </Table>         
      </Paper>
    );    
  }
}

import _ from 'lodash';

export default connect(
  state => ({
    rows: calculateRows(state),    
    myTokens: state.tokens.myTokens,
    myTokensRows: getMyTokens(state)
  }),
  { toggleMyToken }
)(TokensTable);
