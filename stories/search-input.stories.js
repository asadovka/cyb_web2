import React from 'react';

import { storiesOf } from '@storybook/react';


import { withState } from '@dump247/storybook-state';

import "../app/src/global.less";

import {
  SearchForm
} from '../app/src/components/SearchForm/'

import {
  Container,
  BGWrapper,
  TopPanel,
} from '../app/src/components/home/';


import {
  Layout,
  AppHeader,
  AppContent,
  AppMenu,
} from '../app/src/components/AppLayout/';

storiesOf('search form', module)
.add('home', withState({ open: true })(({ store }) => (
  <BGWrapper>
    <TopPanel>
      <Container>
        <SearchForm />
      </Container>
    </TopPanel>
  </BGWrapper>
)))
.add('app', withState({ open: true })(({ store }) => (
  <Layout>
    <AppHeader>
      <SearchForm />
    </AppHeader>
    <AppMenu>
    </AppMenu>
    <AppContent>
    </AppContent>
  </Layout>
)))




  
