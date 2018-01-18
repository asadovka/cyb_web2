import * as React from "react";

import { connect } from 'react-redux';

import Card, { CardActions, CardContent } from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';

import { getLinksByTag } from './module';

import {Injector} from "../../injector";
const {
  chaingearApi
} = Injector.of();

const LinksGroup = ({
  title,
  links,
  noIcone = false
}) => {
  if (links.lenght) return null;

  return (
    <div style={{ marginBottom: 40 }}>
      {title && <h2 className='title'>{title}</h2>}
      <div className='tags'>
       {links.map(link => (
         <a target="_blank" key={link.url} className='tag' href={link.url}>
           {(!noIcone && link.icon) && <img style={{ marginRight: 10 }} width={20} src={chaingearApi.imageUrl() + link.icon} />} {link.name}
         </a>
        ))}
      </div>
    </div>
  );
}

let CoinLinks = ({ tokensDetails }) => {
  const { data } = tokensDetails;
  if (!data.system) {
    return (
      <div style={{ textAlign: 'center'}}>
         <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <LinksGroup 
        links={getLinksByTag(data, 'News')} 
        title='News'
      />
      <LinksGroup 
        links={getLinksByTag(data, 'Apps')} 
        title='Apps'
      />
      <LinksGroup 
        links={getLinksByTag(data, 'Science')} 
        title='Scientific Roots'
        noIcone={true}
      />
      <LinksGroup 
        links={getLinksByTag(data, 'Code')}
        title='Developers Dimension' 
        noIcone={true}
      />
        
     </div> 
  );
}



export default connect(
  (state, ownProps) => ({
    tokensDetails: state.tokensDetails.tokensDetails
  })
)(CoinLinks);
