import * as React from "react";

import App from '../app/';
     
import {Injector} from "../../injector";
const {
  chaingearApi
} = Injector.of();


import { getSystemLogoUrl } from '../../modules/chaingear';

import { CardList, Card } from '../../components/Cards/';

import { connect } from 'react-redux';

import { showAllCrowdsales } from '../../modules/chaingear';

import { Logo } from '../../components/AssetTable/';
var numeral = require('numeral');
import moment from 'moment'

import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from '../../components/Table/';

class Crowdsales extends React.Component {

  componentDidMount() {
    this.props.showAllCrowdsales();   
  }

  render() {
    const {
      items
    } = this.props;

    // const cards = items.map(item => (
    //   <Card
    //     key={item.system}
    //     logo={getSystemLogoUrl(item, chaingearApi.imageUrl())}
    //     name={item.system}
    //     system={item.system}
    //     descriptions={item.descriptions && item.descriptions.headline}
    //     tokens_sold={item.crowdsales.tokens_sold}
    //   />
    // ))
    // <CardList>
    //        {cards}
    //      </CardList>
    const rows = items.map(item => (
      <TableRow>
        <TableCell>
          <Logo to={`/crowdsales/${item.system}`}>
            <img width={50} src={getSystemLogoUrl(item, chaingearApi.imageUrl())}/>            
            <span>{item.system}</span>
          </Logo>
        </TableCell>
        <TableCell>
          {item.descriptions && item.descriptions.headline}
        </TableCell>
        <TableCell>
          {moment(item.crowdsales.end_date).format('YYYY.MM.DD')}
        </TableCell>
        <TableCell>
          {numeral(item.crowdsales.tokens_sold).format('0,0,0.00')}
        </TableCell>
      </TableRow>
    ))
    return (
      <Paper>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>system</TableCell>
             <TableCell>descriptions</TableCell>
             <TableCell>crowdsales</TableCell>
             <TableCell>tokens sold</TableCell>
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

export default connect(
  state => ({
    items: state.chaingear.crowdsales.data
  }),
  { showAllCrowdsales }
)(Crowdsales);
