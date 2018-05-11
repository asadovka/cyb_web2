import React from 'react';

import { storiesOf } from '@storybook/react';


import { withState } from '@dump247/storybook-state';


import {
  Layout,
  AppHeader,
  AppContent,
  AppMenu,
  Menu, MenuItem,
} from '../app/src/components/AppLayout/';

import {
  SearchForm
} from '../app/src/components/SearchForm/'

import { Title } from '../app/src/components/Title/';
import { 
  Head, SubTitle, Button,
  Details, DetailsRow, Label, Value,
  TLink, TransactionsTable,
  EPrice,
  FlexContainer
} from '../app/src/components/ItemsDetails/';


import Tabs, { Tab } from '../app/src/components/Tabs/';

storiesOf('Ethereum pages', module)
.add('block', withState({ open: false })(({ store }) => (
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
    <AppContent >
            <div className='container' style={{ width: 1090 }}>
        <Head>
          <Button o>previous</Button>
          <Title inline={true}>Ethereum Block #5000000</Title>
          <Button >next</Button>
        </Head>
        <SubTitle>Overview</SubTitle>
        <Details>
          <DetailsRow>
            <Label>Time (UTC)</Label>
            <Value>3 years ago (2015-07-30T18:31:17+03:00)</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>block hash</Label>
            <Value>0x74d74553948545d4754462d28d3fa4f8efb6f35e08559616df1c5c72695ae0b6</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>sha3uncles</Label>
            <Value>0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>block size</Label>
            <Value>538 bytes</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>nonce</Label>
            <Value>???</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>extra data</Label>
            <Value>0x426974636f696e2069732054484520426c6f636b636861696e2e</Value>
          </DetailsRow>
        </Details>
         
        <SubTitle>Mining</SubTitle>
        <Details>
          <DetailsRow>
            <Label>miner</Label>
            <Value>0x1b7047b4338acf65be94c1a3e8c5c9338ad7d67c</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>difficulty</Label>
            <Value>17,416,275,986</Value>
          </DetailsRow>
        </Details>

        <SubTitle>Rewards</SubTitle>
        <Details>
          <DetailsRow>
            <Label>static block reward</Label>
            <Value>5.000000 ETH</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>transaction fees</Label>
            <Value>0.000000 ETH</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>uncle inclusion reward</Label>
            <Value>0.000000 ETH</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>total block reward</Label>
            <Value>5.000000 ETH</Value>
          </DetailsRow>
        </Details>

        <SubTitle>Transaction</SubTitle>
        <FlexContainer>
          <Tabs value={1} onChange={() => {}}>
            <Tab label={`transaction: 2`} value={1}></Tab>
          </Tabs>
        </FlexContainer>
        <TransactionsTable 
          page={0} 
          pageSize={10} 
          totalCount={2}
        >
          <thead>
            <tr>
              <th>Hash</th>
              <th>Age</th>
              <th>From</th>
              <th>To</th>
              <th>Value</th>
              <th>Fee</th>
            </tr>
          </thead>
          <thead>
            <tr >
              <td><TLink hash={'0x9d2f76af534006c0d40e23af572925fba31994597991173f997ba0fc1764af91'}/></td>
              <td>5 months ago</td>
              <td><TLink hash='0x923d4a972be3bf2b1527984550db29a4205a520c'/></td>
              <td><TLink hash='0x923d4a972be3bf2b1527984550db29a4205a520c'/></td>
              <td><EPrice value={316.472152} icon={true}/></td>
              <td><EPrice value={0.00295} /></td>
            </tr>
            <tr>
                <td><TLink hash='0x11c2d6c664d2527ff33e0fc184b946a0d72e86eec03a02134f0162bb8a7dc5b4'/></td>
                <td>5 months ago</td>
                <td><TLink hash='0x923d4a972be3bf2b1527984550db29a4205a520c'/></td>
                <td><TLink hash='0x923d4a972be3bf2b1527984550db29a4205a520c'/></td>
                <td><EPrice value={35.918054} icon={true}/></td>
                <td><EPrice value={0.002} /></td>
              </tr>
          </thead>
        </TransactionsTable>
      </div>
    </AppContent>
  </Layout>
)));




  
