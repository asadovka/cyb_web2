import React from 'react';

import { storiesOf } from '@storybook/react';


import { withState } from '@dump247/storybook-state';


import {
  Layout,
  AppHeader,
  AppContent,
  AppMenu,
  AppSecondMenu,
  Menu, MenuItem,
} from '../app/src/components/AppLayout/';

import {
  SearchForm
} from '../app/src/components/SearchForm/'

import { Title, List } from '../app/src/components/searchPage/'
import { RoundCheckbox } from '../app/src/components/RoundCheckbox/'

import { Container } from '../app/src/components/SearchItems/';

import { colors } from '../app/src/components/SearchItems/';

import EthereumBlock from '../app/src/containers/search/SearchResultPage/items/EthereumBlock';
import EthereumUncle from '../app/src/containers/search/SearchResultPage/items/EthereumUncle';
import EthereumTx from '../app/src/containers/search/SearchResultPage/items/EthereumTx';
import EthereumAddress from '../app/src/containers/search/SearchResultPage/items/EthereumAddress';

import EthereumClassicBlock from '../app/src/containers/search/SearchResultPage/items/EthereumClassicBlock';
import EthereumClassiUncle from '../app/src/containers/search/SearchResultPage/items/EthereumClassiUncle';
import EthereumClassicTx from '../app/src/containers/search/SearchResultPage/items/EthereumClassicTx';
import EthereumClassicContract from '../app/src/containers/search/SearchResultPage/items/EthereumClassicContract';

// import "../app/src/global.less";

storiesOf('search', module)
.add('basics', withState({ open: false })(({ store }) => (
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
    <AppSecondMenu>
      <Title>Show results for:</Title>

      <RoundCheckbox  
            checked={true} 
            label='Blockchain'  />
      <List>
        <li>
          <RoundCheckbox 
            checked={true} 
            label='Ethereum' color={colors.ethereum} />
        </li>
        <li>
          <RoundCheckbox 
            checked={true} 
            label='Ethereum Classic' 
            color={colors.ethereum_classic} />
        </li>
      </List>

      <RoundCheckbox  
            checked={false} 
            label='Object'  />
      <List>
        <li>
          <RoundCheckbox  
            checked={true} 
            label='Contract' color={colors.contract} />
        </li>
        <li>
          <RoundCheckbox  
            checked={true} 
            label='Block' color={colors.block} />
        </li>
        <li>
          <RoundCheckbox  
            checked={true} 
            label='Uncle block' 
            color={colors.uncle} />
        </li>
        <li>
          <RoundCheckbox  
            checked={true} 
            label='Transaction' color={colors.transaction} />
        </li>
      </List>
    </AppSecondMenu>
    <AppContent withMenu={true}>
      <Container>
        <EthereumBlock
          number={42}
          hash={'74d74553948545d4754462d28d3fa4f8efb6f35e08559616df1c5c72695ae0b6'}
          tx_number={23}
          timestamp={'2015-07-30T15:31:17.000Z'}
        />
        <EthereumUncle
          hash={'74d74553948545d4754462d28d3fa4f8efb6f35e08559616df1c5c72695ae0b6'}
          block_number={23}
          timestamp={'2015-07-30T15:31:17.000Z'}

        />
        <EthereumTx
          hash={'74d74553948545d4754462d28d3fa4f8efb6f35e08559616df1c5c72695ae0b6'}
          block_time={'2015-07-30T15:31:17.000Z'}
          value={45}
          from='???'
          to='???'
        />
        <EthereumAddress
          hash={'74d74553948545d4754462d28d3fa4f8efb6f35e08559616df1c5c72695ae0b6'}
          first_activity_date={'2015-07-30T15:31:17.000Z'} 
          confirmed_balance={45}
        />
        
        <EthereumClassicBlock
          number={42}
          hash={'74d74553948545d4754462d28d3fa4f8efb6f35e08559616df1c5c72695ae0b6'}
          tx_number={23}
          timestamp={'2015-07-30T15:31:17.000Z'}
        />
        <EthereumClassiUncle
          hash={'74d74553948545d4754462d28d3fa4f8efb6f35e08559616df1c5c72695ae0b6'}
          block_number={23}
          timestamp={'2015-07-30T15:31:17.000Z'}

        />
        <EthereumClassicTx
          hash={'74d74553948545d4754462d28d3fa4f8efb6f35e08559616df1c5c72695ae0b6'}
          block_time={'2015-07-30T15:31:17.000Z'}
          value={45}
          from='???'
          to='???'
        />
        <EthereumClassicContract
          hash={'74d74553948545d4754462d28d3fa4f8efb6f35e08559616df1c5c72695ae0b6'}
          first_activity_date={'2015-07-30T15:31:17.000Z'} 
          confirmed_balance={45}
        />
      </Container>
    </AppContent>
  </Layout>
)));




  
