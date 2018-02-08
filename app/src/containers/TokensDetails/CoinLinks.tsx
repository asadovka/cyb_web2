import * as React from "react";

import { connect } from 'react-redux';

import Card, { CardActions, CardContent } from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';

import { getLinksByTag } from './module';

import { 
  NewsList,
  NewsListLink,

  AppsList, AppsListItem,

  LinkContainer,

  ScientificRoots, ScientificRootsItem,

  DevelopersDimension, DevelopersDimensionItem
} from '../../components/TokenDetails/';

import { Titile } from '../../components/Title/';

import {Injector} from "../../injector";
const {
  chaingearApi
} = Injector.of();


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
      <Titile>News</Titile>
      <NewsList>
        {getLinksByTag(data, 'News').map(link => (
          <NewsListLink 
            url={link.url}
            icon={chaingearApi.imageUrl() + link.icon}
            key={link.url}
          >{link.name}</NewsListLink>
        ))}
      </NewsList>

      <Titile>Apps</Titile>
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
      <Titile>Scientific Roots</Titile>
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

      <Titile>Developers Dimension</Titile>
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
