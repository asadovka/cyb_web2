import React from 'react';

import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';

import "../app/src/global.less";

import {
  BGWrapper,
  TopPanel,
  MetamaskLogo,
} from '../app/src/components/home/';


const text = `[metamask-logo](https://github.com/MetaMask/metamask-logo)`;

storiesOf('MetamaskLogo', module)
.add('basic', withNotes(text)(() => 
  <BGWrapper>
    <TopPanel>
      <MetamaskLogo />      
    </TopPanel>
  </BGWrapper>
))
.add('no metamask', withNotes(text)(() => 
  <BGWrapper>
    <TopPanel>
      <MetamaskLogo disabled={true}/>      
    </TopPanel>
  </BGWrapper>
))



