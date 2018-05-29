import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withNotes, WithNotes } from '@storybook/addon-notes';
import { Welcome } from '@storybook/react/demo';
import someMarkdownText from '../README.md';

import "../app/src/global.less";

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


storiesOf('shell', module)

.add('state1', withNotes(someMarkdownText)(() =>
  <BGWrapper>
    <TopPanel>
      <MetamaskLogo />
      <Container>
        <SearchForm />
        <Legend>
          Search in <strong>134M</strong> transactions in <strong>2</strong>&nbsp;
          blockchains with <strong>135</strong> parsed tokens. Database size: <strong>369</strong> GBs
        </Legend>
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
