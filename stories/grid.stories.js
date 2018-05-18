import React from 'react';

import { storiesOf } from '@storybook/react';


import { withState } from '@dump247/storybook-state';


import {
  Section,
  SectionContent,
  SectionTabs
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
));



  
