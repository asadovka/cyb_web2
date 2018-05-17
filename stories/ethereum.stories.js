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
  FlexContainer,
  Grid,
  Row,
  Paper,
  LabelBlock,
  Status,
  ActionButtonContainer,
  ActionButton
} from '../app/src/components/ItemsDetails/';


import {
  LinkHash
} from '../app/src/components/SearchItems/';

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
          <Button >previous</Button>
          <Title inline={true}>Ethereum Block #5000000</Title>
          <Button >next</Button>
        </Head>
        <SubTitle>Genereral</SubTitle>
        <Details>
          <DetailsRow>
            <Label>UTC Time</Label>
            <Value>2015-07-30T18:31:17</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>hash</Label>
            <Value>0x74d74553948545d4754462d28d3fa4f8efb6f35e08559616df1c5c72695ae0b6</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>size</Label>
            <Value>538 bytes</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>nonce</Label>
            <Value>0xb2192ef00e67aeee</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>transactions</Label>
            <Value>42</Value>
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

        <SubTitle>Blockchain specific</SubTitle>
        <Details>
          <DetailsRow>
            <Label>Sha3Uncles</Label>
            <Value>0x57859b4878535799ef85e90f0dc7b319653d75e93550c5a096d79e93e11fe70f</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>Extra Data</Label>
            <Value>0xe4b883e5bda9e7a59ee4bb99e9b1bc</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>Uncles</Label>
            <Value>2</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>Gas used</Label>
            <Value>3,015,845</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>Gas limit</Label>
            <Value>7,992,185</Value>
          </DetailsRow>
        </Details>


            <SubTitle>Rewards</SubTitle>
            <Details>
              <DetailsRow>
                <Label>static block reward</Label>
                <Value>5.000000 ETH</Value>
              </DetailsRow>
              <DetailsRow>
                <Label>uncle reward</Label>
                <Value>0.000000 ETH</Value>
              </DetailsRow>
              <DetailsRow>
                <Label>fees</Label>
                <Value>0.000000 ETH</Value>
              </DetailsRow>
              <DetailsRow>
                <Label>total block reward</Label>
                <Value>5.000000 ETH</Value>
              </DetailsRow>
            </Details>

            <SubTitle>Uncles</SubTitle>          
            <TransactionsTable>
              <thead>
                <tr>
                  <th>Hash</th>
                  <th>Level</th>
                  <th>Miner</th>
                  <th>Reward</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <TLink to='/' hash={'0x9d2f76af534006c0d40e23af572925fba31994597991173f997ba0fc1764af91'}/>
                  </td>
                  <td>
                    2
                  </td>
                  <td>
                    <TLink to='/' hash={'0x9d2f76af534006c0d40e23af572925fba31994597991173f997ba0fc1764af91'}/>
                  </td>
                  <td>
                    3 ETh
                  </td>
                </tr>
                <tr>
                  <td>
                    <TLink to='/' hash={'0x9d2f76af534006c0d40e23af572925fba31994597991173f997ba0fc1764af91'}/>
                  </td>
                  <td>
                    2
                  </td>
                  <td>
                    <TLink to='/' hash={'0x9d2f76af534006c0d40e23af572925fba31994597991173f997ba0fc1764af91'}/>
                  </td>
                  <td>
                    3 ETh
                  </td>
                </tr>
              </tbody>
            </TransactionsTable>


        <SubTitle>Transaction</SubTitle>
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
              <td>
                <TLink to='/' hash={'0x9d2f76af534006c0d40e23af572925fba31994597991173f997ba0fc1764af91'}/>
              </td>
              <td>5 months ago</td>
              <td><TLink to='/' hash='0x923d4a972be3bf2b1527984550db29a4205a520c'/></td>
              <td><TLink to='/' hash='0x923d4a972be3bf2b1527984550db29a4205a520c'/></td>
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
        <Title>Ethereum Transaction</Title>
        <SubTitle>General</SubTitle>
        <Grid>
          <Row width='25%' center>
            <Paper>
              <LabelBlock>UTC TIME:</LabelBlock>
              <span>7/2/2018 17:13:33</span>
            </Paper>
          </Row>

          <Row width='25%' center>
            <Paper>
            <LabelBlock>Hash:</LabelBlock>
              <LinkHash
                marginLeft
                to='/'
                value='0xb4de9f39cf7b6218d51ded0174007d4f9344ddfa690f9c94af00b4d18b7d3bb0'
              />
            </Paper>
          </Row>

          <Row width='25%' center>
            <Paper>
            <LabelBlock>Value:</LabelBlock>
            <span>3 ETH</span>
            </Paper>
          </Row>

          <Row width='25%' center>
            <Paper>
            <LabelBlock>State:</LabelBlock>
            <Status type='success'>
              Confirmed
            </Status>
            </Paper>
          </Row>
        </Grid>

        
        <Grid>
          <Row width='50%'>
          <SubTitle>Blockchains specific</SubTitle>
            <Details>
              <DetailsRow>
                <Label>Block</Label>
                <Value>234234</Value>
              </DetailsRow>
              <DetailsRow>
                <Label>Size</Label>
                <Value>193 bytes</Value>
              </DetailsRow>
              <DetailsRow>
                <Label>Confirmations</Label>
                <Value>2123</Value>
              </DetailsRow>
              <DetailsRow>
                <Label>Nonce</Label>
                <Value>3</Value>
              </DetailsRow>                            
            </Details>
          </Row>

          <Row width='50%'>
            <SubTitle>Fees</SubTitle>
            <Details>
              <DetailsRow>
                <Label>Fee</Label>
                <Value>0.002 ETH</Value>
              </DetailsRow>
              <DetailsRow>
                <Label>GAS Price</Label>
                <Value>3 GWEI</Value>
              </DetailsRow>
              <DetailsRow>
                <Label>GAS Limit</Label>
                <Value>21000</Value>
              </DetailsRow>
              <DetailsRow>
                <Label>GAS Used</Label>
                <Value></Value>
              </DetailsRow>                            
            </Details>
          </Row>
        </Grid>

        <SubTitle>Adresses</SubTitle>
        <TransactionsTable>
          <thead>
            <tr>
              <th>Sender</th>
              <th></th>
              <th>Receiver</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <LinkHash
                  to='/'
                  value='0xb4de9f39cf7b6218d51ded0174007d4f9344ddfa690f9c94af00b4d18b7d3bb0'
                />
              </td>
              <td>
                <span>></span>
              </td>
              <td>
                <LinkHash
                  to='/'
                  value='0xb4de9f39cf7b6218d51ded0174007d4f9344ddfa690f9c94af00b4d18b7d3bb0'
                />
              </td>
              <td>
                <span>3 ETH</span>
              </td>
            </tr>
          </tbody>
        </TransactionsTable>

        <SubTitle>Code</SubTitle>
        <Paper>
          Input data
        </Paper>
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
        <SubTitle>General</SubTitle>
        <Details>
          <DetailsRow>
            <Label>UTC Time</Label>
            <Value>2018-01-30T17:07:12</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>hash</Label>
            <Value>
              <LinkHash
                to='/'
                value='0xb4de9f39cf7b6218d51ded0174007d4f9344ddfa690f9c94af00b4d18b7d3bb0'
              />
            </Value>
          </DetailsRow>
          <DetailsRow>
            <Label>parent block</Label>
            <Value>500001</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>parent hash</Label>
            <Value>
              <LinkHash
                to='/'
                value='0xb4de9f39cf7b6218d51ded0174007d4f9344ddfa690f9c94af00b4d18b7d3bb0'
              />
            </Value>
          </DetailsRow>
          <DetailsRow>
            <Label>level</Label>
            <Value>2</Value>
          </DetailsRow>
        </Details>

        <SubTitle>Mining</SubTitle>
        <Details>
          <DetailsRow>
            <Label>miner</Label>
            <Value>
              <LinkHash
                to='/'
                value='0xb4de9f39cf7b6218d51ded0174007d4f9344ddfa690f9c94af00b4d18b7d3bb0'
              />
            </Value>
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

        <div style={{ textAlign: 'center'}}>
          <Robohash hash='0xa7f995d07929ceb231b27523e3feb7478203b254ff6d3b7e27cf1e8383022dad' />
        </div>

        <SubTitle>General</SubTitle>
        <ActionButtonContainer>
          <ActionButton />
          <Grid>
            <Row width='25%' center>
              <Paper>
                <QRCode hash='0xa7f995d07929ceb231b27523e3feb7478203b254ff6d3b7e27cf1e8383022dad' />
              </Paper>
            </Row>

            <Row width='25%' center>
              <Paper center>
                <LabelBlock>UTC TIME:</LabelBlock>
                <span>7/2/2018 17:13:33</span>
              </Paper>
            </Row>

            <Row width='25%' center>
              <Paper center>
              <LabelBlock>Hash:</LabelBlock>
                <LinkHash
                  to='/'
                  value='0xb4de9f39cf7b6218d51ded0174007d4f9344ddfa690f9c94af00b4d18b7d3bb0'
                />
              </Paper>
            </Row>

            <Row width='25%' center>
              <Paper center>
              <LabelBlock>Balance:</LabelBlock>
              <span>3 ETH</span>
              </Paper>
            </Row>
          </Grid>        
        </ActionButtonContainer>

        <SubTitle>Cashflow</SubTitle>
        <Paper noPadding>
        <Grid noPadding>
          <Row width='50%'>
            <Details noShadow>
              <DetailsRow>
                <Label>Transactions</Label>
                <Value>12</Value>        
              </DetailsRow>
              <DetailsRow>
                <Label>Unconfirmed transactions</Label>
                <Value>3</Value>        
              </DetailsRow>
            </Details>
          </Row>
          <Row width='50%'>
            <Details noShadow>
              <DetailsRow>
                <Label>Accumulated income</Label>
                <Value>10 ETH</Value>        
              </DetailsRow>
              <DetailsRow>
                <Label>Pending income</Label>
                <Value>7 ETH</Value>        
              </DetailsRow>
            </Details>
          </Row>
        </Grid>
        </Paper>

        <SubTitle>Charts</SubTitle>
      </div>
  </App>
)))

  
