import React from 'react';

import { storiesOf } from '@storybook/react';


import { withState } from '@dump247/storybook-state';


import {
  Layout,
  AppHeader,
  AppContent,
  AppMenu,
  AppSecondMenu,
  Menu, MenuItem,
} from '../app/src/components/AppLayout/';

import {
  SearchForm
} from '../app/src/components/SearchForm/'

let menu;

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
    {menu && <AppSecondMenu>
      menu
    </AppSecondMenu>}
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
    <AppContent withMenu={true}>
      content
    </AppContent>
  </Layout>
)))
.add('with components', withState({ open: false })(({ store }) => (
  <Layout 
    open={store.state.open}
    onToggle={() => store.set({ open: !store.state.open })}
  >
    <AppHeader>
      <SearchForm />
    </AppHeader>
    <AppMenu>
      <Menu open={store.state.open} >
        <MenuItem icon='stratis' to='/tokens'>Tokens</MenuItem>
        <MenuItem icon='mail' to='/contracts'>Contracts</MenuItem>
        <MenuItem icon='internet' to='/labels'>Labels</MenuItem>
        <MenuItem icon='omi' to='/icos'>ICOs</MenuItem>
        <MenuItem icon='hitbox' to='/registers'>Blockchains</MenuItem>
        <MenuItem icon='refresh' to='/exchanges'>Exchanges</MenuItem>
        <MenuItem icon='chart' to='/analytics'>Analytics</MenuItem>
        <MenuItem icon='square-qube' to='/cybernode'>cybernode</MenuItem>
        <MenuItem icon='help' to='/faq'>FAQ</MenuItem>
      </Menu>
    </AppMenu>    
    <AppContent>
      content
    </AppContent>
  </Layout>
)));



  
