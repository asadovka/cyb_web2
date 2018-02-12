import * as React from 'react';

import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from '../../components/Table/';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';

class Test extends React.Component {
  componentDidMount() {
    this.props.showTokens();
  }
  
  render() {    
    const { orders, myTokens, toggleMyToken, changeSearch } = this.props;



    // const rows = orders.map(order => (
    //   <TableRow key={order.symbol}>
    //     <TableCell padding="checkbox">
    //       <Checkbox 
    //         checked={myTokens.indexOf(order.symbol) !== -1}
    //         onChange={(event, checked) => toggleMyToken(order.symbol, checked)}
    //       />
    //     </TableCell>
    //     <TableCell>{order.symbol}</TableCell>
    //     <TableCell>{order.amount}</TableCell>
    //     <TableCell>{order.price}</TableCell>
    //   </TableRow>
    // ))
    // return (
    //   <Paper>
    //     <Table>
    //       <TableHead>
    //         <TableRow>
    //           <TableCell padding="checkbox">
    //             {/*<Checkbox />*/}
    //             <TextField onChange={(e) => changeSearch(e.target.value)} />
    //           </TableCell>
    //           <TableCell>token</TableCell>
    //           <TableCell>amount</TableCell>
    //           <TableCell>price</TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {rows}
    //       </TableBody>
    //     </Table>
    //   </Paper>
    // );
    return (
      <div>
        <div style={{ display: 'flex' }}>
          <div style={{ background: 'red' }}>1</div>
          <div style={{ background: 'red' }}>2</div>
          <div style={{ background: 'red' }}>3</div>
        </div>
      </div>
    );
  }
}

import { showTokens, getRows, toggleMyToken, changeSearch } from './module';

import { connect } from 'react-redux';

export default connect(
  state => ({
    orders: getRows(state),
    myTokens: state.test.myTokens,
    search: state.test.search
  }),
  { showTokens, toggleMyToken, changeSearch }
)(Test);
