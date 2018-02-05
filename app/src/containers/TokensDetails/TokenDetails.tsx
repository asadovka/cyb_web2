import * as React from 'react';
import { connect } from 'react-redux';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { getSystemLogoUrl } from '../Tokens/module';
import { CircularProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import { getLinksByTag } from './module'
var numeral = require('numeral');

import { 
  LinkList, LinkListItem,
  Label, Title,
  Price, PriceChange, PriceValue,
  CoinLogoContainer, CoinSystem
} from './../../components/TokenDetails/';

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
  let conten;

  if (!data.system) {
    conten =  (
      <Card>
        <CardContent style={{ textAlign: 'center'}}>
         <CircularProgress />
        </CardContent>
      </Card>
    );
  } else {
    conten = (
      <div>
          <Grid container spacing={16}>
            <Grid item xs={4} >
              <Paper style={{ padding: 20 }}>
                <Grid container spacing={0}>
                  <Grid item xs={4} >
                    <CoinLogoContainer>
                    <img width={50} src={getSystemLogoUrl(data, chaingearApi.imageUrl())} />
                    <CoinSystem>
                      {data.system}
                    </CoinSystem>
                    <CoinSystem>
                      {data.token.symbol}
                    </CoinSystem>
                    </CoinLogoContainer>
                  </Grid>
                  <Grid item xs={8} style={{ paddingLeft: 20, borderLeft: '1px solid #ccc' }}>
                    <Price>
                      <PriceValue>{priceFormat(price_usd)} USD</PriceValue>
                      <PriceChange>{procentFormat(price_change_usd)}%</PriceChange>
                    </Price>
                    <Price>
                      <PriceValue>{priceFormat(price_btc)} BTC</PriceValue>
                      <PriceChange>{procentFormat(price_change_btc)}%</PriceChange>            
                    </Price>
                    <Price>
                      <PriceValue>{priceFormat(price_eth)} ETH</PriceValue>
                      <PriceChange>{procentFormat(price_change_eth)}%</PriceChange> 
                    </Price>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper style={{ padding: 20 }}>
                <Grid container spacing={16}>
                  <Grid item xs={4}>
                    <Title>Capitalization</Title>
                    <Label>{format(price_usd * supply)} USD</Label>
                    <Label>{format(price_btc * supply)} BTC</Label>
                  </Grid>
                  <Grid item xs={4} style={{  borderLeft: '1px solid #ccc' }}>
                    <Title color="green">Volume (24)</Title>
                    <Label>{format(voluem * price_usd)} USD</Label>
                    <Label>{format(voluem)} {data.token.symbol}</Label>
                  </Grid>
                  <Grid item xs={4} style={{  borderLeft: '1px solid #ccc' }}>
                    <Title color="blue">Supply</Title>
                    <Label>Maximum: {format(supply)} {data.token.symbol}</Label>
                    <Label>Circulating: {format(supply_circ)} {data.token.symbol}</Label>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>    
         <LinkList>
          {getLinksByTag(data, "Main", 4).map(link => (
            <LinkListItem 
              key={link.name} 
              url={link.url}
              name={link.name}
            />
          ))}
          </LinkList>
       </div>
    );
  }

  return (
    <div style={{ minHeight: 187 }}>
      {conten}
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
