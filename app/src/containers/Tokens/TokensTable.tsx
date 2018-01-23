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
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';

const styles = {
  checked: {
    color: green[500],
  },
};

const TokenRows = withStyles(styles)(({ item, myTokens, toggleMyToken, classes }) => {
  const procent = item.procent;
  return (
    <TableRow >
      <TableCell style={{ textAlign: 'center', borderBottom: 'none', width: '7%' }} padding="checkbox">
        <Checkbox 
          checked={myTokens.indexOf(item.symbol) !== -1}
          onChange={(event, checked) => {
            toggleMyToken(item.symbol, checked);
          }}
          classes={{
            checked: classes.checked,
          }}
        />
      </TableCell>
      <TableCell style={{ borderBottom: 'none', textAlign: 'right', width: '10%'}} padding="none">
        <Logo to={`/tokens/${item.symbol}-${item.currency}`}>
          <img width={30} src={item.logo}/>            
          <span>{item.system}</span>
          {/*<span style={{ marginLeft: 20 }} className={`tag ${(item.currency === 'USD' || item.currency === 'USDT') ? 'is-success' : 'is-warning'}`}>
            {item.currency}
          </span>*/}
        </Logo>
      </TableCell >
      <TableCell style={{ borderBottom: 'none', textAlign: 'right', paddingRight: 20, width: '10%'}} padding="none">
        {numeral(item.price * item.supply).format('$0,0,0,0').replace(/,/g,' ')}
      </TableCell>
      <TableCell style={{ borderBottom: 'none', textAlign: 'right', width: '10%'}} padding="none">
        {item.price > 1 ? numeral(item.price).format('$0,0,0.00').replace(/,/g,' ') : numeral(item.price).format('$0,0,0.0000').replace(/,/g,' ')}
      </TableCell>
      <TableCell style={{ borderBottom: 'none', textAlign: 'right', width: '20%'}} padding="none">
        {numeral(item.amount).format('$0,0,0').replace(/,/g,' ')}
      </TableCell>
      <TableCell style={{ borderBottom: 'none', textAlign: 'right', width: '13%'}} padding="none">
        {numeral(item.supply).format('0,0,0,0').replace(/,/g,' ') }&nbsp;{item.symbol}
      </TableCell>
      <TableCell style={{ borderBottom: 'none', textAlign: 'right', width: '10%'}} padding='none'>
        <span style={{
          color: procent === 0 ? '#000' : (procent < 0 ? 'red' : 'green')
        }}>{numeral(item.procent).format('0.00')}%</span>
      </TableCell>
      <TableCell style={{ borderBottom: 'none', textAlign: 'right', width: '30%', height: 100 }} padding='none'>
        <PriceChart
          symbol={item.symbol} 
          currency={item.currency}
        />
      </TableCell>
    </TableRow>
  );
})

const buttonStyle = {
  borderRadius: 290486,
  paddingLeft: '1em',
  paddingRight: '1em',
};

const TableHeader = ({ onReset, myTokens }) => (
  <TableHead>
     <TableRow>
       <TableCell padding="checkbox" style={{ textAlign: 'center', width: '7%'}} >                
         {onReset && <button disabled={myTokens.length === 0} style={buttonStyle} className="button is-small is-rounded is-light" onClick={onReset}>Clean</button>}
       </TableCell>
       <TableCell padding='none' style={{ textAlign: 'left', width: '10%'}}>Token</TableCell>
       <TableCell padding='none' style={{ textAlign: 'right', paddingRight: 20, width: '10%' }}>Market&nbsp;Cap</TableCell>
       <TableCell padding='none' style={{ textAlign: 'right', width: '10%'}}>Weighted Price</TableCell>
       <TableCell padding='none' style={{ textAlign: 'right', width: '20%'}}><TableSortLabel active={false}>Volume&nbsp;(24h)</TableSortLabel></TableCell>               
       <TableCell padding='none' style={{ textAlign: 'right', width: '13%'}}>Supply</TableCell>               
       <TableCell padding='none' style={{ width: '10%', textAlign: 'right'}}>Change&nbsp;(24h)</TableCell>
       <TableCell padding='none' style={{ width: '30%', textAlign: 'center'}}>Price Graph&nbsp;(7d)</TableCell>
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
      <Paper>
        <Table>
          <TableHeader onReset={resetTokens} myTokens={myTokens}/> 
          <TableBody>
             {myRowsComponents}
          </TableBody>
        </Table>
        <Table>
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
  { toggleMyToken, resetTokens }
)(TokensTable);
