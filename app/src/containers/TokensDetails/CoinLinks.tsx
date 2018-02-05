import * as React from "react";

import { connect } from 'react-redux';

import Card, { CardActions, CardContent } from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';

import { getLinksByTag } from './module';

import { 
  LinkTitile,
  NewsList,
  NewsListLink,

  AppsList, AppsListItem,

  LinkContainer,

  ScientificRoots, ScientificRootsItem,

  DevelopersDimension, DevelopersDimensionItem
} from '../../components/TokenDetails/';


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
      {title && <LinkTitile>{title}</LinkTitile>}
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
    <LinkContainer>
      <LinkTitile>News</LinkTitile>
      <NewsList>
        {getLinksByTag(data, 'News').map(link => (
          <NewsListLink 
            url={link.url}
            icon={chaingearApi.imageUrl() + link.icon}
            key={link.url}
          >{link.name}</NewsListLink>
        ))}
      </NewsList>
      <LinkTitile>Apps</LinkTitile>
      <AppsList>
        {getLinksByTag(data, 'Apps').map(link => (
          <AppsListItem
            url={link.url}
            icon={chaingearApi.imageUrl() + link.icon}
            key={link.url}
          >
            {link.name}
          </AppsListItem>
        ))}
      </AppsList>
      <LinkTitile>Scientific Roots</LinkTitile>
      <ScientificRoots>
        {getLinksByTag(data, 'Science').map(link => (
          <ScientificRootsItem
            url={link.url}
            key={link.url}
          >
            {link.name}
          </ScientificRootsItem>
        ))}
      </ScientificRoots>

      <LinkTitile>Developers Dimension</LinkTitile>
      <DevelopersDimension>
         {getLinksByTag(data, 'Code').map(link => (
          <DevelopersDimensionItem
            url={link.url}
            key={link.url}
          >
            {link.name}
          </DevelopersDimensionItem>
        ))}
      </DevelopersDimension>
        
     </LinkContainer> 
  );
}



export default connect(
  (state, ownProps) => ({
    tokensDetails: state.tokensDetails.tokensDetails
  })
)(CoinLinks);
