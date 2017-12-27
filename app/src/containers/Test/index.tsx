import * as React from 'react';

import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from '../../components/Table/';

class Test extends React.Component {
  componentDidMount() {
    this.props.showTokens();
  }
  
  render() {
    console.log(' render ');
    
    const { orders } = this.props;
    const rows = orders.map(order => (
      <TableRow key={order.symbol}>
        <TableCell>{order.symbol}</TableCell>
        <TableCell>{order.amount}</TableCell>
        <TableCell>{order.price}</TableCell>
      </TableRow>
    ))
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>token</TableCell>
              <TableCell>amount</TableCell>
              <TableCell>price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

import { showTokens, getRows } from './module';

import { connect } from 'react-redux';

export default connect(
  state => ({
    orders: getRows(state)
  }),
  { showTokens }
)(Test);
