import React from 'react';

import { storiesOf } from '@storybook/react';


import { withState } from '@dump247/storybook-state';


import { 
  Head, Button,
} from '../app/src/components/ItemsDetails/';

import {
  Section,
  SectionContent,
  SectionTabs
} from '../app/src/components/grid/';

import Tabs, { Tab } from '../app/src/components/Tabs/';
import { Title } from '../app/src/components/Title/';

import Container from '../app/src/components/Container/';

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


storiesOf('Grid', module)
.addDecorator(BGDecorator)
.add('basic', () => (
  <Container>
    <Section>
      <SectionContent title='Blockshain'>
        <div>Input data</div>
        <div>Input data</div>
      </SectionContent>
      <SectionContent title='Fee'>
        <div>Input data</div>
      </SectionContent>
    </Section>

    <Section title='Blockshain'>
      <SectionContent >
        <div>Input data</div>
        <div>Input data</div>
      </SectionContent>
      <SectionContent>
        <div>Input data</div>
      </SectionContent>
    </Section>

    <Section title='General'>
      <SectionContent >
        <div>1</div>
        <div>1</div>
      </SectionContent>
      <SectionContent>
        <div>2</div>
      </SectionContent>
      <SectionContent>
        <div>3</div>
      </SectionContent>
      <SectionContent>
        <div>4</div>
      </SectionContent>
    </Section>

    <Section title='Cashflow'>
      <SectionContent >
        <div>qr</div>
      </SectionContent>
      <SectionContent grow={3}>
        <div>Input data</div>
      </SectionContent>
    </Section>

    <Section>
      <SectionContent title='Code'>
        Input data
      </SectionContent>
    </Section>


    <Section title='Tabs sample'>
      <SectionTabs>
        tabs container
      </SectionTabs>
      <SectionContent >
        Input data
      </SectionContent>
    </Section>

    <Section>
      <SectionContent title={<span>Bad<br/>case</span>}>
        <div>Input data</div>
        <div>Input data</div>
      </SectionContent>
      <SectionContent>
        <div>Input data</div>
      </SectionContent>
      <SectionContent title='Fee'>
        <div>Input data</div>
      </SectionContent>
    </Section>

  </Container>
))
.add('tabs', () => (
  <Container>

    <Section title='Tabs sample'>
      <SectionTabs>
        <Tabs value={1}>
          <Tab label='Transactions' value={1}>
            Transactions
          </Tab>
          <Tab label='Operations' value={2}>
            Operations
          </Tab>
        </Tabs>        
      </SectionTabs>
      <SectionContent >
        Input data
      </SectionContent>
    </Section>

  </Container>
))
.add('title', () => (
  <Container>
    <Title>Bitcoin contract</Title>
    <Section title='General'>
      <SectionContent >
        <div>1</div>
        <div>1</div>
      </SectionContent>
      <SectionContent>
        <div>2</div>
      </SectionContent>
      <SectionContent>
        <div>3</div>
      </SectionContent>
      <SectionContent>
        <div>4</div>
      </SectionContent>
    </Section>
  </Container>
))
.add('title with button', () => (
  <Container>
    <Head>
      <Button >previous</Button>
      <Title inline={true}>Ethereum Block #5000000</Title>
      <Button >next</Button>
    </Head>
    <Section title='General'>
      <SectionContent >
        <div>1</div>
        <div>1</div>
      </SectionContent>
      <SectionContent>
        <div>2</div>
      </SectionContent>
      <SectionContent>
        <div>3</div>
      </SectionContent>
      <SectionContent>
        <div>4</div>
      </SectionContent>
    </Section>
  </Container>
))


        

  
