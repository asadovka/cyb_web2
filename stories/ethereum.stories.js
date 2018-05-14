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

import Container from '../app/src/components/Container/';


import QRCode from '../app/src/components/QRCode';
import Robohash from '../app/src/components/Robohash';


const App = ({ onToggle, open, children }) => (
  <Layout 
    open={open}
    onToggle={onToggle}
  >
    <AppHeader>
      <SearchForm />
    </AppHeader>
    <AppMenu>
      <Menu open={open} >
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
      <Container>
        {children}
      </Container>
    </AppContent>
  </Layout>
)

storiesOf('Ethereum pages', module)
.add('block', withState({ open: false })(({ store }) => (
  <App 
    open={store.state.open}
    onToggle={() => store.set({ open: !store.state.open })}
  >
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
    </App>
)))
.add('transaction', withState({ open: false })(({ store }) => (
  <App 
    open={store.state.open}
    onToggle={() => store.set({ open: !store.state.open })}
  >
        <div style={{ textAlign: 'center' }}>
          <Title inline={true}>Ethereum Transaction</Title>
        </div>
        <SubTitle>Overview</SubTitle>
        <Details>
          <DetailsRow>
            <Label>time(UTC)</Label>
            <Value>7/2/2018 17:13:33 UTC</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>transaction hash</Label>
            <Value>0xb4de9f39cf7b6218d51ded0174007d4f9344ddfa690f9c94af00b4d18b7d3bb0</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>block</Label>
            <Value>5000000</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>nonce</Label>
            <Value>3</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>status</Label>
            <Value>Confirmed (???, ??? confirmations)</Value>
          </DetailsRow>
        </Details>

        <SubTitle>Details</SubTitle>
        <Details>
          <DetailsRow>
            <Label>Type</Label>
            <Value>???</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>from</Label>
            <Value>0xb4de9f39cf7b6218d51ded0174007d4f9344ddfa690f9c94af00b4d18b7d3bb0</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>to</Label>
            <Value>0xb4de9f39cf7b6218d51ded0174007d4f9344ddfa690f9c94af00b4d18b7d3bb0</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>value</Label>
            <Value>3 УЕР</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>fee</Label>
            <Value>0ю0002 УЕР</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>gas price</Label>
            <Value>3 GWEI</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>gas used</Label>
            <Value></Value>
          </DetailsRow>
          <DetailsRow>
            <Label>gas limit</Label>
            <Value>21000</Value>
          </DetailsRow>
        </Details>

        <SubTitle>Data</SubTitle>
        <Details>
          <DetailsRow>
            <Label>input</Label>
            <Value>???</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>logs</Label>
            <Value>???</Value>
          </DetailsRow>
        </Details>
  </App>
)))
.add('uncle', withState({ open: false })(({ store }) => (
  <App 
    open={store.state.open}
    onToggle={() => store.set({ open: !store.state.open })}
  >
    <div>
        <Head>
          <Title inline={true}>Ethereum Uncle Block #500000</Title>
        </Head>
        <SubTitle>Overview</SubTitle>
        <Details>
          <DetailsRow>
            <Label>Time (UTC)</Label>
            <Value>2018-01-30T17:07:12+03:00</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>parent block height</Label>
            <Value>500001</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>parent block hash</Label>
            <Value>0x0a264d62c3b7f50ba3464649fde3f2f3e1c776d80b335263c0923899a2d7f09e</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>uncle level</Label>
            <Value>1</Value>
          </DetailsRow>
        </Details>

        <SubTitle>Mining</SubTitle>
        <Details>
          <DetailsRow>
            <Label>miner</Label>
            <Value>0x84990f5d2e09f56cabdabf6409ad31bdd8363b50</Value>
          </DetailsRow>
        </Details>

        <SubTitle>Rewards</SubTitle>
        <Details>
          <DetailsRow>
            <Label>uncle inclusion reward</Label>
            <Value>2.625 ETH</Value>
          </DetailsRow>
        </Details>
      </div>
  </App>
)))
.add('contract', withState({ open: false })(({ store }) => (
  <App 
    open={store.state.open}
    onToggle={() => store.set({ open: !store.state.open })}
  >
      <div>
        <Title>Ethereum Contract</Title>
        <Head>
          <div>
            <Robohash hash='0xa7f995d07929ceb231b27523e3feb7478203b254ff6d3b7e27cf1e8383022dad' />
          </div>
          <div>
            <QRCode hash='0xa7f995d07929ceb231b27523e3feb7478203b254ff6d3b7e27cf1e8383022dad' />
          </div>
          <div>
            <div style={{
              width: 55,
              height: 55,
              background: '#438cef',
              borderRadius: '50%',
              boxShadow: '0px 1px 4px #438cef'
            }}>
            </div>
          </div>
        </Head>
        <SubTitle>Overview</SubTitle>
        <Details>
          <DetailsRow>
            <Label>Time (UTC)</Label>
            <Value>07.02.2018 17:13:33 (UTC)</Value>        
          </DetailsRow>
          <DetailsRow>
            <Label>Last activity</Label>
            <Value>3 min ago</Value>        
          </DetailsRow>
          <DetailsRow>
            <Label>address hash</Label>
            <Value>1C1mCxRukix1KfegAY5zQQJV7samAciZpv</Value>        
          </DetailsRow>
        </Details>

        <SubTitle>Balance</SubTitle>
        <Details>
          <DetailsRow>
            <Label>Transactions</Label>
            <Value>12</Value>        
          </DetailsRow>
          <DetailsRow>
            <Label>Unconfirmed transactions</Label>
            <Value>???</Value>        
          </DetailsRow>
          <DetailsRow>
            <Label>Lifetime balance</Label>
            <Value>???</Value>        
          </DetailsRow>
          <DetailsRow>
            <Label>Current balance</Label>
            <Value>5 ETH</Value>        
          </DetailsRow>
          <DetailsRow>
            <Label>Current balance with unconfirmed transactions</Label>
            <Value>???</Value>        
          </DetailsRow>
        </Details>
      </div>
  </App>
)))

  
