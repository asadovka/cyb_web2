import * as React from "react";

import { connect } from 'react-redux';

import Card, { CardActions, CardContent } from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';



import {Injector} from "../../injector";
const {
  chaingearApi
} = Injector.of();

let CoinLinks = ({ tokensDetails }) => {
  const { data } = tokensDetails;
  return (
    <div>
     {data.system ? <div>
     <h2 className='title'>Links:</h2>
     <div className='tags'>
     {data.links.map(link => (
       <a key={link.url} className='tag' href={link.url}>
         {link.icon && <img style={{ marginRight: 10 }} width={20} src={chaingearApi.imageUrl() + link.icon} />} {link.name}
       </a>
      ))}
     </div> 
     </div> : <div style={{ textAlign: 'center'}}>
       <CircularProgress />
     </div>}
    </div>
  );
}



export default connect(
  (state, ownProps) => ({
    tokensDetails: state.tokensDetails.tokensDetails
  })
)(CoinLinks);
