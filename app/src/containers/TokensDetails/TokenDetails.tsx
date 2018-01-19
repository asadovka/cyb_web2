import * as React from 'react';
import { connect } from 'react-redux';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { getSystemLogoUrl } from '../Tokens/module';
import { CircularProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';

import { getLinksByTag } from './module'
var numeral = require('numeral');

import {Injector} from "../../injector";
const {
  chaingearApi
} = Injector.of();


import _ from 'lodash';

function format(value) {
  return numeral(value).format('0,0,0').replace(/,/g,' ')
}

function procentFormat(value) {
  return numeral(value).format('0.00')
}

function priceFormat(value) {
  return value > 1 
    ? numeral(value).format('0,0,0.00').replace(/,/g,' ') 
    : numeral(value).format('0,0,0.0000').replace(/,/g,' ')
}

const TokenDetails = ({ 
  tokensDetails,
  supply, 
  voluem, supply_circ, 
  price_usd,
  price_btc, 
  price_eth,
  price_change_usd,
  price_change_btc, 
  price_change_eth 
}) => {
  const { data } = tokensDetails;
  if (!data.system) {
    return (
      <Card>
        <CardContent style={{ textAlign: 'center'}}>
         <CircularProgress />
        </CardContent>
      </Card>
    );
  }
  return (
    <div>
        <Grid container spacing={16}>
          <Grid item xs={1} style={{ textAlign: 'center'}}>
            <img width={70} src={getSystemLogoUrl(data, chaingearApi.imageUrl())} />
          </Grid>
          <Grid item xs={2}>
            <h2 className='title is-2'>{data.system}</h2>
            <h3 className='subtitle is-3'>{data.token.symbol}</h3>     
          </Grid>
          <Grid item xs={2}>
            <h2 className="title is-5" style={{ display: 'flex', justifyContent: 'space-between'}}>
              <span>{priceFormat(price_usd)} USD</span>
              <span style={{ color: 'green'}}>{procentFormat(price_change_usd)}%</span>
            </h2>
            <h3 className="title is-6" style={{ display: 'flex', justifyContent: 'space-between'}}>
              <span>{priceFormat(price_btc)} BTC</span>
              <span style={{ color: 'green'}}>{procentFormat(price_change_btc)}%</span>            
            </h3>
            <h3 className="title is-6" style={{ display: 'flex', justifyContent: 'space-between'}}>
              <span>{priceFormat(price_eth)} ETH</span>
              <span style={{ color: 'green'}}>{procentFormat(price_change_eth)}%</span> 
            </h3>
          </Grid>
          <Grid item xs={2}>
            <h2 className="title is-5">Capitalization</h2>
            <h3 className="title is-6">{format(price_usd * supply)} USD</h3>
            <h3 className="title is-6">{format(price_btc * supply)} BTC</h3>
          </Grid>
          <Grid item xs={2}>
            <h2 className="title is-5">Volume (24h)</h2>
            <h3 className="title is-6">{format(voluem * price_usd)} USD</h3>
            <h3 className="title is-6">{format(voluem)} {data.token.symbol}</h3>
          </Grid>
          <Grid item xs={3}>
            <h2 className="title is-5">Supply</h2>
            <h3 className="title is-6">Maximum: {format(supply)} {data.token.symbol}</h3>
            <h3 className="title is-6">Circulationg: {format(supply_circ)} {data.token.symbol}</h3>
          </Grid>
        </Grid>    
       <div style={{ marginTop: 20, marginBottom: 20 }}>
        {getLinksByTag(data, "Main", 4).map(link => (
          <div key={link.name}>
          <a style={{ color: '#000'}} target="_blank" href={link.url}>{link.name}</a>
          </div>
        ))}
        </div>
     </div>
  );
}



export default connect(
  (state, ownProps) => ({
    tokensDetails: state.tokensDetails.tokensDetails,
    price_usd: 12000,
    price_btc: 1,
    price_eth: 10,

    price_change_usd: 5.45,
    price_change_btc: 0,
    price_change_eth: 0,

    supply: 21000000,
    supply_circ: 16000,
    voluem: 1621290
  })
)(TokenDetails);
