import React from 'react';

import { storiesOf } from '@storybook/react';


import { withState } from '@dump247/storybook-state';


import {
  Layout,
  AppHeader,
  AppContent,
  AppMenu,
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
    <AppContent withMenu={true}>
      content
    </AppContent>
  </Layout>
)));



  
