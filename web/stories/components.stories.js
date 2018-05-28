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


storiesOf('Components current', module)
.addDecorator(BGDecorator)
.add('Title', () => (
  <Container>
    <Title>Ethereum Transaction</Title>
    <SubTitle>general</SubTitle>
    <Details>
      <DetailsRow>
        <Label>Block</Label>
        <Value>234234</Value>
      </DetailsRow>                           
    </Details>
  </Container>
))
.add('subtitle + view', () => (
  <Container>
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
          <DetailsRow>
            <Label>Confirmations</Label>
            <Value>2123</Value>
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
        </Details>
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
            <Label>GAS Limit</Label>
            <Value>21000</Value>
          </DetailsRow>                           
        </Details>
      </Row>
    </Grid>


  

    <SubTitle>SubTitle</SubTitle>
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
  </Container>
))
.add('subtitle + table', () => (
  <Container>
    <SubTitle>SubTitle</SubTitle>
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
  </Container>
))
.add('items + status ', () => (
  <Container>
      <Grid>
        <Row width='25%' center>
          <Paper>
          <LabelBlock>State:</LabelBlock>
          <Status type='success'>
            success
          </Status>
          </Paper>
        </Row>

        <Row width='25%' center>
          <Paper>
          <LabelBlock>State:</LabelBlock>
          <Status type='warning'>
            warning
          </Status>
          </Paper>
        </Row>

        <Row width='25%' center>
          <Paper>
          <LabelBlock>State:</LabelBlock>
          <Status type='error'>
            error
          </Status>
          </Paper>
        </Row>

      </Grid>
  </Container>
))
.add('items + paper + hash', () => (
  <Container>
    <Grid>
      <Row width='25%' center>
        <Paper center>
          <LabelBlock>with copy</LabelBlock>
          <LinkHash
            to='/'
            value='0xb4de9f39cf7b6218d51ded0174007d4f9344ddfa690f9c94af00b4d18b7d3bb0'
          />
        </Paper>
      </Row>

      <Row width='25%' center>
        <Paper center>
          <LabelBlock>no copy</LabelBlock>
          <LinkHash
            noCopy
            to='/'
            value='0xb4de9f39cf7b6218d51ded0174007d4f9344ddfa690f9c94af00b4d18b7d3bb0'
          />
        </Paper>
      </Row>

      <Row width='25%' center>
        <Paper center>
        <LabelBlock>hash text:</LabelBlock>
        <LinkHash
          noCopy
          value='0xb4de9f39cf7b6218d51ded0174007d4f9344ddfa690f9c94af00b4d18b7d3bb0'
        />
        </Paper>
      </Row>

      <Row width='25%' center>
        <Paper center>
        <LabelBlock>hash text with copy:</LabelBlock>
        <LinkHash
          value='0xb4de9f39cf7b6218d51ded0174007d4f9344ddfa690f9c94af00b4d18b7d3bb0'
        />
        </Paper>
      </Row>

    </Grid>
  </Container>
))
.add('subttitle + content', () => (
  <Container>
    <SubTitle>SubTitle</SubTitle>
    <Paper>
      content
    </Paper>
  </Container>
))
.add('subttitle + Tabs + content', () => (
  <Container>
    <SubTitle>SubTitle</SubTitle>
    <Tabs value={1}>
      <Tab label='Transactions' value={1}>
        Transactions
      </Tab>
      <Tab label='Operations' value={2}>
        Operations
      </Tab>
    </Tabs>
    <Paper>
      content
    </Paper>
  </Container>
))
.add('items + qr + robohash + button', () => (
  <Container>
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
            <Robohash hash='0xa7f995d07929ceb231b27523e3feb7478203b254ff6d3b7e27cf1e8383022dad' />
          </Paper>
        </Row>

        <Row width='25%' center>
          <Paper center>
            text
          </Paper>
        </Row>

        <Row width='25%' center>
          <Paper center>
            text
          </Paper>
        </Row>
      </Grid>        
    </ActionButtonContainer>
  </Container>
))


  
