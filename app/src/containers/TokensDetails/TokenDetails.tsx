import * as React from 'react';
import { connect } from 'react-redux';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { getSystemLogoUrl } from '../../modules/chaingear';
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
     <h2 className='title'>Links:</h2>
     <div className='tags'>
     {data.links.map(link => (
       <a key={link.url} className='tag' href={link.url}>
         {link.icon && <img style={{ marginRight: 10 }} width={20} src={chaingearApi.imageUrl() + link.icon} />} {link.name}
       </a>
      ))}
     </div> 
     </CardContent> : <CardContent style={{ textAlign: 'center'}}>
       <CircularProgress />
     </CardContent>}
    </Card>
  );
}



export default connect(
  (state, ownProps) => ({
    tokensDetails: state.chaingear.tokensDetails
  })
)(TokenDetails);
