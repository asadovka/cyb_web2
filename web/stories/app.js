import React from 'react';

import { storiesOf } from '@storybook/react';


import { withState } from '@dump247/storybook-state';



// import Container from '../app/src/components/Container/';

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

import {
  BGWrapper
} from '../app/src/components/home/';

storiesOf('browser', module)
.add('home page', () => (
  <BGWrapper>
    LOL
  </BGWrapper>
))
.add('search result', () => (
  <Container>
    home
  </Container>
))
.add('search with app', () => (
  <Container>
    home
  </Container>
))

        

  
