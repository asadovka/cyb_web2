import * as React from 'react';
import { connect } from 'react-redux';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { getSystemLogoUrl } from '../Tokens/module';
import { CircularProgress } from 'material-ui/Progress';

import { getLinksByTag } from './module'

import {Injector} from "../../injector";
const {
  chaingearApi
} = Injector.of();


import _ from 'lodash';


const TokenDetails = ({ tokensDetails, price, supply, voluem }) => {
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
    <Card>
      <CardContent>      
     <img width={50} src={getSystemLogoUrl(data, chaingearApi.imageUrl())} />
     <h2 className='title'>{data.system}</h2>
     <h3 className='subtitle'>{data.token.symbol}{' '}{data.descriptions.state}{' '}{data.descriptions.system_type}</h3>     
     <div>price: {price}</div>
     <div>cap: {price * supply}</div>
     <div>voluem: {voluem}</div>
     <div>supply: {supply}</div>
     <div>
        {getLinksByTag(data, "Main", 4).map(link => (
          <div key={link.name}>
          <a target="_blank" href={link.url}>{link.name}</a>
          </div>
        ))}
      </div>
     </CardContent>
    </Card>
  );
}



export default connect(
  (state, ownProps) => ({
    tokensDetails: state.tokensDetails.tokensDetails,
    price: 1000,
    supply: 1000000,
    voluem: 2000
  })
)(TokenDetails);
