import React, { Component } from 'react';


// TODO: refactoring

import {
  SearchForm
} from './components/SearchForm/'

import {
  Layout,
  AppHeader,
  AppContent,
  AppMenu,
  Menu, MenuItem,
} from './components/AppLayout/';


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
} from './components/home/';


import {
  SearchContainer,
  Title,
  SearchItem
} from './components/searchresults/';

import IdBar from './components/idbar/';

import Cyb from './utils/cyb';

// http://cyberd.network
const cyb = new Cyb('http://cyberd.network');
// 'http://localhost:3002');

import { 
  Panel, PanelLeft, PanelRight,
  SearchFormPanel ,
  Logo,
  HamburgerMenu,
  Loading
} from './components/Test/';

const apps = {
  chainger: 'ipns/QmNSj3MXbP65VW8onJXULpZWXTGEypAW4AcAFrqzvYpA84/',
  tokens: 'ipns/QmaKvs4z88cAcWxZWEqSE9Lb4hnUCqM2eP5rT8eBATRx3h/',
  ethexplorer: 'ipns/QmPcCVuMsN5mSxyDjkf5hw9J2c4L5Qh556dTPoDuse4cRu/',
  createapp: 'ipns/QmXxrgEojs1o23iztBYmcFtBCSGm1Cu4mnMz8p1fd17N4w/',
  appstore: 'ipns/QmdghMauLPetefpnhFZ3QknR7bV2UiijMtAiPitBeBJxHm/'
}



import axios from 'axios';

// https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
function bytesToSize(bytes) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function nFormatter(num, digits) {
  var si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: " k" },
    { value: 1E6, symbol: " M" },
    { value: 1E9, symbol: " B" },
    { value: 1E12, symbol: " T" },
    { value: 1E15, symbol: " P" },
    { value: 1E18, symbol: " E" }
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      index: null,
      currentPath: null,
      links: null,

      q: null,
      loading: false,
      menuOpen: false,
      metamaskUse: false,
      time: 0,

      transactionsCount: 1441341424,
      blockchains: 2,
      indexSizeBytes: 547722617454,

      tokensCount: 0
    }
    this.nav = this.nav.bind(this);
    this.link = this.link.bind(this);
  }
  componentDidMount() {
    // https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md#ear-listening-for-selected-account-changes
    // find better solution
    const check = () => {
      cyb.checkMetomask()
        .then(metamaskUse => this.setState({
          metamaskUse
        }))
    }
    this.timer = setInterval(check, 2000)
    check();

    axios.get('http://api.cybersearch.io/search/stats')
      .then(response => {
        this.setState({
          transactionsCount: response.data.transactionsCount,
          blockchains: response.data.blockchains,
          indexSizeBytes: response.data.indexSizeBytes
        })
      })

    axios.get('http://api.cybermarkets.io/exchanges/tokens/count')
      .then(response => {
        this.setState({
          tokensCount: response.data
        })
      })
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  link() {
    var q = this.refs.q.value; 
    var link = this.refs.link.value;
    cyb.linkMethod(q, link)
  }
  nav(e, link) {    
    e.preventDefault();
    // var q = this.refs.q.value; 
    cyb.linkMethod(this.state.q, link)
      .then(() => {
        this.setState({
          currentPath: 'ipfs/' + link,
          loading: true
        })        
      })
  }


  onSubmit = (value) => {
    this.setState({
      links: [],
      q: value,
      loading: true
    });

    cyb.search(value)
      .then(links => {
        this.setState({
          links,
          q: value,
          currentPath: null,
          loading: false
        })
      })
    // browserHistory.push(`/search?q=${value}`);
  }


  goMain = (e) => {
    e.preventDefault();
    this.setState({
      links: null,
      q: null
    })
  }

  toggle = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  menuNavigate = (e, appName, page) => {
    if (e) e.preventDefault();

    this.setState({
      links: [],
      currentPath: apps[appName] + (page ? '#' + page : ''),
      time: (new Date()).getTime(), 
      menuOpen: false,
      loading: true
    })
  }

  // componentDidUpdate = (prevProps, prevState, snapshot) => {
  //   const { currentPath } = this.state;
  //   if (currentPath !== prevState.currentPath) {
  //     const path = currentPath ? `http://ipfs.cyb.ai/${currentPath}`: null;
  //     this.refs.iframe.src = '';
  //     this.refs.iframe.src = path;
  //   }

  // }

  onLoad = (e) => {
    this.setState({
      loading: false
    })
  }

  render() {
    const { currentPath, links, loading, menuOpen, metamaskUse, time } = this.state;

    const path = currentPath ? `http://ipfs.cyb.ai/${currentPath}`: null;

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
        <Item onClick={(e) => this.menuNavigate(e, 'createapp')}>
          <ItemTitle>Create App</ItemTitle>
          <Image type='createApp'/>
          <Arrow />
        </Item>
      </Items>
    );

    if (!metamaskUse) {
      buttons = (
        <Items>
          <Item to='https://metamask.io/' target="_blank">
            <Image type='appStore'/>
            <ItemTitle>Please use<br/> metamask</ItemTitle>
          </Item>
          <Item disabled={true}>
            <ItemTitle>Create Register</ItemTitle>
            <Image type='createRegistry'/>
            <Arrow />
          </Item>
          <Item disabled={true}>
            <ItemTitle>Create App</ItemTitle>
            <Image type='createApp'/>
            <Arrow />
          </Item>
        </Items>
      );
    }

    let content;

    if (links === null) {
      content = (
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
      )
    } else {

      if (currentPath === null) {
        if (loading === false) {
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
               
      } else {
        content = (              
              <iframe style={{ boxSizing: 'border-box', minHeight: '100vh' }} key={time} src={path} onLoad={this.onLoad} width="100%" height="100%" >
                iframe not supported!
             </iframe>
            )
      }

         
    }

    const { 
      transactionsCount,
      blockchains,
      indexSizeBytes,
      tokensCount
    } = this.state;
    
    return (
      <div style={{ background: '#eff3f6', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{  left: 0, right: 0, minHeight: (links === null) ? 550 : 109 }}>
      <Panel open={links !== null}>
        
          <PanelLeft>
            <HamburgerMenu open={menuOpen} onClick={this.toggle}>
              <Menu open={true} >
                <MenuItem onClick={(e) => this.menuNavigate(e, 'ethexplorer')} icon='explorer' >Ethereum</MenuItem>
                <MenuItem onClick={(e) => this.menuNavigate(e, 'chainger')} icon='chaingear' >Chaingear</MenuItem>
                <MenuItem onClick={(e) => this.menuNavigate(e, 'tokens')} icon='tokens' >Tokens</MenuItem>
              </Menu>
            </HamburgerMenu>
            <Logo onClick={this.goMain}>logo</Logo>
          </PanelLeft>
          <SearchFormPanel>
          <SearchForm  onSubmit={this.onSubmit} />
                <Legend>
                   Search in <strong>{nFormatter(transactionsCount, 1)}</strong>&nbsp; transactions in <strong>{blockchains}</strong>&nbsp;
                   blockchains with <strong>{tokensCount}</strong> parsed tokens. Database size: <strong>{bytesToSize(indexSizeBytes)}</strong>
                </Legend>
          </SearchFormPanel>
          <PanelRight>
            <IdBar />
          </PanelRight>
 </Panel>
 </div>
  <div style={{  flexGrow: 1 }}>
  {loading && <Loading />}
  {content}
  </div>
  
     </div>
        );

  }
}

export default App;
