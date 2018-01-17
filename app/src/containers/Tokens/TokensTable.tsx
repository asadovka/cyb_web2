import * as React from "react";


import { Logo, PriceInfo, NoInfo } from '../../components/AssetTable/';

import { connect } from 'react-redux';
var numeral = require('numeral');

import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '../../components/Table/';

import { calculateRows, changeSearch, toggleMyToken, getMyTokens, resetTokens } from './module';

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
      <TableCell style={{ borderBottom: 'none', width: '10%' }} padding="checkbox">
        <Checkbox 
          checked={myTokens.indexOf(item.symbol) !== -1}
          onChange={(event, checked) => {
            toggleMyToken(item.symbol, checked);
          }}
        />
      </TableCell>
      <TableCell style={{ borderBottom: 'none', textAlign: 'right', width: '15%'}} padding="none">
        <Logo to={`/tokens/${item.symbol}-${item.currency}`}>
          <img width={30} src={item.logo}/>            
          <span>{item.system}</span>
          <span style={{ marginLeft: 20 }} className={`tag ${(item.currency === 'USD' || item.currency === 'USDT') ? 'is-success' : 'is-warning'}`}>
            {item.currency}
          </span>
        </Logo>
      </TableCell >
      <TableCell style={{ borderBottom: 'none', textAlign: 'right', paddingRight: 20, width: '10%'}} padding="none">
        {numeral(item.price * item.supply).format('$0,0,0,0').replace(/,/g,' ')}
      </TableCell>
      <TableCell style={{ borderBottom: 'none', textAlign: 'right', width: '10%'}} padding="none">
        <span style={{
          color: procent === 0 ? '#000' : (procent < 0 ? 'red' : 'green')
        }}>{item.price > 1 ? numeral(item.price).format('$0,0,0.00').replace(/,/g,' ') : numeral(item.price).format('$0,0,0.0000').replace(/,/g,' ')}</span>
      </TableCell>
      <TableCell style={{ borderBottom: 'none', textAlign: 'right', width: '15%'}} padding="none">
        {numeral(item.amount).format('$0,0,0.00').replace(/,/g,' ')}
      </TableCell>
      <TableCell style={{ borderBottom: 'none', textAlign: 'right', width: '10%'}} padding="none">
        {numeral(item.supply).format('0,0,0,0').replace(/,/g,' ') }&nbsp;{item.symbol}
      </TableCell>
      <TableCell style={{ borderBottom: 'none', textAlign: 'right', width: '10%'}} padding='none'>
        {numeral(item.procent).format('0.00')}%
      </TableCell>
      <TableCell style={{ borderBottom: 'none', textAlign: 'right', width: '30%'}} padding='none'>
        <PriceChart
          symbol={item.symbol} 
          currency={item.currency}
        />
      </TableCell>
    </TableRow>
  );
}

const TableHeader = ({ onReset }) => (
  <TableHead>
     <TableRow>
       <TableCell padding="checkbox" style={{ textAlign: 'left', width: '10%'}} >                
         {onReset && <Button raised color="default" onClick={onReset}>reset</Button>}
       </TableCell>
       <TableCell padding='none' style={{ textAlign: 'left', width: '15%'}}>Token</TableCell>
       <TableCell padding='none' style={{ textAlign: 'right', paddingRight: 20, width: '10%' }}>Market&nbsp;cap</TableCell>
       <TableCell padding='none' style={{ textAlign: 'right', width: '10%'}}>Price</TableCell>
       <TableCell padding='none' style={{ textAlign: 'right', width: '15%'}}><TableSortLabel active={true}>Volume by pair</TableSortLabel></TableCell>               
       <TableCell padding='none' style={{ textAlign: 'right', width: '10%'}}>Supply</TableCell>               
       <TableCell padding='none' style={{ width: '10%', textAlign: 'right'}}>%&nbsp;(24h)</TableCell>
       <TableCell padding='none' style={{ width: '30%', textAlign: 'center'}}>Price graph (7d)</TableCell>
     </TableRow>
   </TableHead>
)

class TokensTable extends React.Component {

  render() {
    const {
      rows,
      myTokens,
      toggleMyToken,
      myTokensRows,
      resetTokens
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
      <div>
        <Table>
          <TableHeader onReset={resetTokens}/> 
          <TableBody>
             {myRowsComponents}
          </TableBody>
        </Table>
        <Table>
          <TableBody>
            {rowsComponents}
          </TableBody>
         </Table>         
      </div>
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
  { toggleMyToken, resetTokens }
)(TokensTable);
