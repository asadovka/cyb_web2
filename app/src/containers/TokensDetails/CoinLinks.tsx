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

import { Title } from '../../components/Title/';

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
      <Title>News</Title>
      <NewsList>
        {getLinksByTag(data, 'News').map(link => (
          <NewsListLink 
            url={link.url}
            icon={chaingearApi.imageUrl() + link.icon}
            key={link.url}
          >{link.name}</NewsListLink>
        ))}
      </NewsList>

      <Title>Apps</Title>
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
      <Title>Scientific Roots</Title>
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

      <Title>Developers Dimension</Title>
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
