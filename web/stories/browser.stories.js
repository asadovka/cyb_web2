import React from 'react';

import { storiesOf } from '@storybook/react';


import { withState } from '@dump247/storybook-state';



// import Container from '../app/src/components/Container/';

const styles = {
  backgroundColor: '#eff3f6',
  paddingTop: 50,
  paddingBottom: 50,
  minHeight: '100vh'
};

const BGDecorator = (storyFn) => (
  <div style={styles}>
    { storyFn() }
  </div>
);

import {
  Container,
  BGWrapper,
  TopPanel,
  MetamaskLogo,
  Legend,
  Items,
  Item,
  LinkList,
  LinkItem,
  ItemTitle,
  Image,
  Arrow
} from '../app/src/components/home/';

import {
  SearchForm
} from '../app/src/components/SearchForm/'
// import {
//   SearchForm
// } from '../app/src/components/SearchForm/'

storiesOf('browser', module)
.add('home page', () => (
  <BGWrapper>
    <TopPanel>
      <Container>
        <SearchForm />
      </Container>
    </TopPanel>
    <Container>
      <Items>
        <Item>
          <ItemTitle>400 B USD</ItemTitle>
          <span>Total market cap</span>
          <Arrow />
        </Item>
        <Item>
          <ItemTitle>37</ItemTitle>
          <span>Chaingear registries</span>
          <Arrow />
        </Item>
        <Item>
          <ItemTitle>3.4 BTC</ItemTitle>
          <span>Portfolio volume</span>
          <Arrow />
        </Item>
      </Items>
      <LinkList>
        <LinkItem to='/' icon='github'>GitHub</LinkItem>
        <LinkItem to='/' icon='roadmap'>Roadmap</LinkItem>
        <LinkItem to='/' icon='cybernode'>Cybernode</LinkItem>
        <LinkItem to='/' icon='dashboard'>Dashboard</LinkItem>
        <LinkItem to='/' icon='knowledge'>Knowledge</LinkItem>
      </LinkList>
    </Container>
  </BGWrapper>
))
.add('search result', () => (
  <Container>
    home
  </Container>
))
.add('search with app', () => (
  <Container>
    home
  </Container>
))

        

  
