import React from 'react';

import { storiesOf } from '@storybook/react';


import { 
  Head, SubTitle, Button,
  Details, DetailsRow, Label, Value,
  TLink, TransactionsTable,
  EPrice,
  FlexContainer
} from '../app/src/components/ItemsDetails/';

import { withState } from '@dump247/storybook-state';


import {
  Layout,
  AppHeader,
  AppContent,
  AppMenu,
  SearchForm,
  Logo,
  Menu, MenuItem,
  Switcher,
  LayoutSwitcher,
  AppSecondMenu
} from '../app/src/components/AppLayout/';

storiesOf('App layout', module)
.add('basic', withState({ open: true })(({ store }) => (
  <Layout 
    open={store.state.open}
    onToggle={() => store.set({ open: !store.state.open })}
  >
    <AppHeader>
      header
    </AppHeader>
    <AppMenu>
      <span style={{ color: 'red' }}>menu</span>
    </AppMenu>
    <AppContent>
      content
    </AppContent>
  </Layout>
)))
.add('with menu', withState({ open: false })(({ store }) => (
  <Layout 
    open={store.state.open}
    onToggle={() => store.set({ open: !store.state.open })}
  >
    <AppHeader>
      header
    </AppHeader>
    <AppMenu>
      <span style={{ color: 'red' }}>menu</span>
    </AppMenu>
    <AppSecondMenu>
      menu
    </AppSecondMenu>
    <AppContent>
      content
    </AppContent>
  </Layout>
)));



  
