// import * as React from 'react';

// import Paper from 'material-ui/Paper';
// import Table, { TableBody, TableCell, TableHead, TableRow } from '../../components/Table/';
// import Checkbox from 'material-ui/Checkbox';
// import TextField from 'material-ui/TextField';

// const {ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = require('recharts');

// import {
//   Switcher
// } from '../../components/AppLayout/';


// // const data = [{name: 'Page A', price: 590, volume: 800, amt: 1400},
// //               {name: 'Page B', price: 868, volume: 967, amt: 1506},
// //               {name: 'Page C', price: 1397, volume: 1098, amt: 989},
// //               {name: 'Page D', price: 1480, volume: 1200, amt: 1228},
// //               {name: 'Page E', price: 1520, volume: 1108, amt: 1100},
// //               {name: 'Page F', price: 1400, volume: 680, amt: 1700}];

// const colors = [
//   '#4c8cfe',
//   '#6862db',
//   '#61c8b0',
//   '#e65f64',
//   '#ff9f00',
// ]


// const exchanges = [
//   'gdax',
//   'hitbtc'
// ];
// class Test extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: []
//     };
//     //https://min-api.cryptocompare.com/data/histohour?fsym=ETH&tsym=BTC&e=gdax
//   }

//   componentDidMount() {
//     //this.props.showTokens();
//     Promise.all([
//       fetch('https://min-api.cryptocompare.com/data/histohour?fsym=ETH&tsym=USD&e=gdax')
//       .then(response => response.json()),
//       fetch('https://min-api.cryptocompare.com/data/histohour?fsym=ETH&tsym=USD&e=hitbtc')
//       .then(response => response.json()),
//       fetch('https://min-api.cryptocompare.com/data/histohour?fsym=ETH&tsym=USD&e=bitfinex')
//       .then(response => response.json())

//     ]).then(data => {
//       const r = [];
//       for(var i = 0; i < data[0].Data.length; i++ ) {
//         r.push({
//           gdax_price: data[0].Data[i].close,
//           hitbtc_price: data[1].Data[i].close,
//           bitfinex_price: data[2].Data[i].close,

//           gdax_volume: data[0].Data[i].volumeto,
//           hitbtc_volume: data[1].Data[i].volumeto,
//           bitfinex_volume: data[2].Data[i].volumeto,


//         })
//       }
//       this.setState({ data: r });
//     })
//   }
  
//   // render() {    
//   //   const { data } = this.state;


//   //   return (
//   //     <div>
//   //       <ComposedChart width={600} height={400} data={data} >
  
//   //         <YAxis yAxisId="s"  height={100} domain={[dataMin => 0, dataMax => (dataMax * 3)]}  orientation='left' hide={true} />
//   //         <YAxis yAxisId="s2" domain={[dataMin => (dataMin - (dataMin/100*20)), dataMax => (dataMax + (dataMax/100 * 5))]} orientation='right' />
//   //           <Tooltip/>
//   //         <Line yAxisId="s2" type='monotone'  dataKey='gdax_price' stroke='#4c8cfe' dot={false}/>
//   //         <Line yAxisId="s2" type='monotone'  dataKey='hitbtc_price' stroke='#6862db' dot={false}/>
//   //         <Line yAxisId="s2" type='monotone'  dataKey='bitfinex_price' stroke='#61c8b0' dot={false}/>

//   //         <Bar yAxisId="s" dataKey='gdax_volume' stackId="a" maxBarSize={30} fill='#4c8cfe'/>
//   //         <Bar yAxisId="s" dataKey='hitbtc_volume' stackId="a" maxBarSize={30} fill='#6862db'/>
//   //         <Bar yAxisId="s" dataKey='bitfinex_volume' stackId="a" maxBarSize={30} fill='#61c8b0'/>
//   //      </ComposedChart>
//   //     </div>
//   //   );
//   // }

//   render() {
//     return (
//       <div>
//         test
//       </div>
//     );
//   }
// }

// import { showTokens, getRows, toggleMyToken, changeSearch } from './module';

// import { connect } from 'react-redux';

// export default connect(
//   state => ({
//     orders: getRows(state),
//     myTokens: state.test.myTokens,
//     search: state.test.search
//   }),
//   { showTokens, toggleMyToken, changeSearch }
// )(Test);

import * as React from 'react';

import { 
  Panel, PanelLeft, PanelRight,
  SearchFormPanel ,
  Hamburgermenu, Logo,
  HamburgerMenu
} from './../../components/Test/';


import {
  SearchContainer,
  Title,
  SearchItem
} from './../../components/searchresults/';


import {
  Container,
  BGWrapper,
  TopPanel,
  Legend,
  Items,
  Item,
  LinkList,
  LinkItem,
  ItemTitle,
  Image,
  Arrow
} from './../../components/home/';

import {
  SearchForm
} from './../../components/SearchForm/'

import IdBar from './../../components/idbar/';


import {
  Layout,
  AppHeader,
  AppContent,
  AppMenu,
  Menu, MenuItem,
} from './../../components/AppLayout/';

class Test extends React.Component {
  state = {
    open: true
  }

  search = (e) => {
    // e.preventDefault();
    this.setState({ open: true })
  }

  close = () => {
    this.setState({ open: false })
  }

  menuNavigate = (e, url, page = null) => {

  }

  nav = (e, link) => {

  }

  render() {
    const { open } = this.state;

    let buttons = (
      <Items>
        <Item onClick={(e) => this.menuNavigate(e, 'appstore')}>
          <ItemTitle>App Store</ItemTitle>
          <Image type='appStore'/>
          <Arrow />
        </Item>
        <Item onClick={(e) => this.menuNavigate(e, 'chainger', '/new')}>
          <ItemTitle>Create Register</ItemTitle>
          <Image type='createRegistry'/>
          <Arrow />
        </Item>
        <Item onClick={(e) => this.menuNavigate(e, 'chainger')}>
          <ItemTitle>Create App</ItemTitle>
          <Image type='createApp'/>
          <Arrow />
        </Item>
      </Items>
    );

    let content = (
      <Container>
          {buttons}
          <LinkList>

            <LinkItem target="_blank" to='https://github.com/cybercongress' icon='github'>GitHub</LinkItem>
            <LinkItem target="_blank" to='https://github.com/orgs/cybercongress/projects/1' icon='roadmap'>Roadmap</LinkItem>
            <LinkItem target="_blank" to='http://cybersearch.live' icon='cybernode'>Cybernode</LinkItem>
            <LinkItem target="_blank" to='http://cybersearch.io' icon='knowledge'>Knowledge</LinkItem>
            <LinkItem target="_blank" to='https://medium.com/@cybercongress' icon='blog'>Blog</LinkItem>

          </LinkList>
      </Container>
    );

    const links = [
      '111',
      '222',
      '33'
    ];

    if (open) {
      content = (
          <SearchContainer>
            <Title>Search results:</Title>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {links.map((link) =>(
              <SearchItem key={link}>
                <a onClick={(e) => this.nav(e, link)}>{link}</a>
              </SearchItem>
            ))}
            </ul>
            </SearchContainer>
        )  
    }

    return (
      <div style={{ background: '#eff3f6', minHeight: '100vh' }}>
        <Panel open={open}>
          <PanelLeft>
            <HamburgerMenu>
              <Menu open={open} >
                <MenuItem onClick={(e) => this.menuNavigate(e, 'ethexplorer')} icon='explorer' >Ethereum</MenuItem>
                <MenuItem onClick={(e) => this.menuNavigate(e, 'chainger')} icon='chaingear' >Chaingear</MenuItem>
                <MenuItem onClick={(e) => this.menuNavigate(e, 'tokens')} icon='tokens' >Tokens</MenuItem>
              </Menu>
            </HamburgerMenu>
            <Logo onClick={this.close}>logo</Logo>
          </PanelLeft>
          <SearchFormPanel>
          <SearchForm  onSubmit={this.search} />
                <Legend>
                   Search in <strong>134M</strong> transactions in <strong>2</strong>&nbsp;
                   blockchains with <strong>135</strong> parsed tokens. Database size: <strong>369</strong> GBs
                </Legend>
          </SearchFormPanel>
          <PanelRight>
            <IdBar />
          </PanelRight>
        </Panel>
        {content}
      </div>
    );
  }
}



export default Test;


