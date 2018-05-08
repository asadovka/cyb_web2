import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withNotes, WithNotes } from '@storybook/addon-notes';
import { Welcome } from '@storybook/react/demo';
import someMarkdownText from '../README.md';

// import { Button } from '../app/src/components/Button/';

import { 
  Head, SubTitle, Button,
  Details, DetailsRow, Label, Value,
  TLink, TransactionsTable,
  EPrice,
  FlexContainer
} from '../app/src/components/ItemsDetails/';

import Container from '../app/src/components/Container/';

const styles = {
  backgroundColor: '#eff3f6',
  paddingTop: 50,
  paddingBottom: 50
};

const BGDecorator = (storyFn) => (
  <div style={styles}>
    { storyFn() }
  </div>
);

storiesOf('Panel', module)
.addDecorator(BGDecorator)
.add('basic', () => (
  <Container>
        <Details>
          <DetailsRow>
            <Label>Nonce</Label>
            <Value>0xb2192ef00e67aeee</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>Hash</Label>
            <Value>0xe068df0329ee7d05dc1beac4f63369cbaf918bc759124aeb35dba0b3ecffdd29</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>Size</Label>
            <Value>18,893 bytes</Value>
          </DetailsRow>
        </Details>
  </Container>
));


  
