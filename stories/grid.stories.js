import React from 'react';

import { storiesOf } from '@storybook/react';


import { withState } from '@dump247/storybook-state';


import {
  SectionTitle,
  Section,
  SectionContent,
  Papper
} from '../app/src/components/grid/';


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
.add('two section title with content', () => (
  <Container>
    <Section>
      <SectionContent>
        <SectionTitle>Blockshain</SectionTitle>
        <Papper>
          <div>Input data</div>
          <div>Input data</div>
        </Papper>
      </SectionContent>
      <SectionContent>
        <SectionTitle>Fee</SectionTitle>
        <Papper>
          <div>Input data</div>
        </Papper>
      </SectionContent>
    </Section>

    <SectionTitle>Code</SectionTitle>
    <Section>
      <SectionContent>
        <Papper>Input data</Papper>
      </SectionContent>
    </Section>
  </Container>
));



  
