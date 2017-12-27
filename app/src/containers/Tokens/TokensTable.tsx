import * as React from "react";


import { Logo, PriceInfo, NoInfo } from '../../components/AssetTable/';

import { connect } from 'react-redux';
var numeral = require('numeral');


import Table, { TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '../../components/Table/';

import { calculateRows } from './module';

import Paper from 'material-ui/Paper';

class TokensTable extends React.Component {

  render() {
    const {
      rows,
    } = this.props;

    const rowsComponents = rows.map((item, index) => {
      const procent = item.procent;
      return (
        <TableRow key={index}>
          <TableCell>
            <Logo to={`/tokens/${item.symbol}`}>
              <img width={50} src={item.logo}/>            
              <span>{item.system}</span>
              <span style={{ marginLeft: 20 }} className={`tag ${(item.currency === 'USD' || item.currency === 'USDT') ? 'is-success' : 'is-warning'}`}>
                {item.currency}
              </span>
            </Logo>

          </TableCell>
          <TableCell>{numeral(item.price * item.supply).format('$0,0,0,0.0000')}</TableCell>
          <TableCell>
            <span style={{
              color: procent === 0 ? '#000' : (procent < 0 ? 'red' : 'green')
            }}>{numeral(item.price).format('$0,0,0.0000')}</span>
          </TableCell>
          <TableCell>
            {numeral(item.amount).format('$0,0,0.00')}
          </TableCell>
          <TableCell>
            {numeral(item.supply).format('0,0,0,0.00') }
          </TableCell>
          <TableCell>
            {numeral(item.procent).format('0.00000%')}
          </TableCell>
        </TableRow>
      );
    })

    return (
      <Paper>          
         <Table>
           <TableHead>
             <TableRow>
               <TableCell>system</TableCell>
               <TableCell>market cap</TableCell>
               <TableCell>price</TableCell>
               <TableCell><TableSortLabel active={true}/>amount</TableCell>               
               <TableCell>supply</TableCell>               
               <TableCell>%(1d)</TableCell>
             </TableRow>
           </TableHead>
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
  })
)(TokensTable);
