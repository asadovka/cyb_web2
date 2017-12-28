import * as React from 'react';
import { connect } from 'react-redux';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { getSystemLogoUrl } from '../Tokens/module';
import { CircularProgress } from 'material-ui/Progress';

import {Injector} from "../../injector";
const {
  chaingearApi
} = Injector.of();

const TokenDetails = ({ tokensDetails }) => {
  const { data } = tokensDetails;
  return (
    <Card>
     {data.system ? <CardContent>

     <img width={50} src={getSystemLogoUrl(data, chaingearApi.imageUrl())} />
     <h2 className='title'>{data.system}</h2>
     <h3 className='subtitle'>{data.token.symbol}{' '}{data.descriptions.state}{' '}{data.descriptions.system_type}</h3>     
     </CardContent> : <CardContent style={{ textAlign: 'center'}}>
       <CircularProgress />
     </CardContent>}
    </Card>
  );
}



export default connect(
  (state, ownProps) => ({
    tokensDetails: state.tokensDetails.tokensDetails
  })
)(TokenDetails);
