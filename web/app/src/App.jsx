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

// const apps = {
//   chainger: 'ipns/QmNSj3MXbP65VW8onJXULpZWXTGEypAW4AcAFrqzvYpA84/',
//   tokens: 'ipns/QmaKvs4z88cAcWxZWEqSE9Lb4hnUCqM2eP5rT8eBATRx3h/',
//   ethexplorer: 'ipns/QmPcCVuMsN5mSxyDjkf5hw9J2c4L5Qh556dTPoDuse4cRu/',
//   createapp: 'ipns/QmXxrgEojs1o23iztBYmcFtBCSGm1Cu4mnMz8p1fd17N4w/',
//   appstore: 'ipns/QmdghMauLPetefpnhFZ3QknR7bV2UiijMtAiPitBeBJxHm/'
// }



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

// class App2 extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       index: null,
//       currentPath: null,
//       links: null,

//       q: null,
//       loading: false,
//       menuOpen: false,
//       metamaskUse: false,
//       time: 0,

//       transactionsCount: 1441341424,
//       blockchains: 2,
//       indexSizeBytes: 547722617454,

//       tokensCount: 0
//     }
//     this.nav = this.nav.bind(this);
//     this.link = this.link.bind(this);
//   }
//   componentDidMount() {
//     // https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md#ear-listening-for-selected-account-changes
//     // find better solution
//     const check = () => {
//       cyb.checkMetomask()
//         .then(metamaskUse => this.setState({
//           metamaskUse
//         }))
//     }
//     this.timer = setInterval(check, 2000)
//     check();

//     axios.get('http://api.cybersearch.io/search/stats')
//       .then(response => {
//         this.setState({
//           transactionsCount: response.data.transactionsCount,
//           blockchains: response.data.blockchains,
//           indexSizeBytes: response.data.indexSizeBytes
//         })
//       })

//     axios.get('http://api.cybermarkets.io/exchanges/tokens/count')
//       .then(response => {
//         this.setState({
//           tokensCount: response.data
//         })
//       })
//   }

//   componentWillUnmount() {
//     clearInterval(this.timer)
//   }

//   link() {
//     var q = this.refs.q.value; 
//     var link = this.refs.link.value;
//     cyb.linkMethod(q, link)
//   }
//   nav(e, link) {    
//     e.preventDefault();
//     // var q = this.refs.q.value; 
//     cyb.linkMethod(this.state.q, link)
//       .then(() => {
//         this.setState({
//           currentPath: 'ipfs/' + link,
//           loading: true
//         })        
//       })
//   }


//   onSubmit = (value) => {
//     this.setState({
//       links: [],
//       q: value,
//       loading: true
//     });

//     cyb.search(value)
//       .then(links => {
//         this.setState({
//           links,
//           q: value,
//           currentPath: null,
//           loading: false
//         })
//       })
//     // browserHistory.push(`/search?q=${value}`);
//   }


//   goMain = (e) => {
//     e.preventDefault();
//     this.setState({
//       links: null,
//       q: null
//     })
//   }

//   toggle = () => {
//     this.setState({
//       menuOpen: !this.state.menuOpen
//     })
//   }

//   menuNavigate = (e, appName, page) => {
//     if (e) e.preventDefault();

//     this.setState({
//       links: [],
//       currentPath: apps[appName] + (page ? '#' + page : ''),
//       time: (new Date()).getTime(), 
//       menuOpen: false,
//       loading: true
//     })
//   }

//   // componentDidUpdate = (prevProps, prevState, snapshot) => {
//   //   const { currentPath } = this.state;
//   //   if (currentPath !== prevState.currentPath) {
//   //     const path = currentPath ? `http://ipfs.cyb.ai/${currentPath}`: null;
//   //     this.refs.iframe.src = '';
//   //     this.refs.iframe.src = path;
//   //   }

//   // }

//   onLoad = (e) => {
//     this.setState({
//       loading: false
//     })
//   }

//   render() {
//     const { currentPath, links, loading, menuOpen, metamaskUse, time } = this.state;

//     const path = currentPath ? `http://ipfs.cyb.ai/${currentPath}`: null;

//     let buttons = (
//       <Items>
//         <Item onClick={(e) => this.menuNavigate(e, 'appstore')}>
//           <ItemTitle>App Store</ItemTitle>
//           <Image type='appStore'/>
//           <Arrow />
//         </Item>
//         <Item onClick={(e) => this.menuNavigate(e, 'chainger', '/new')}>
//           <ItemTitle>Create Register</ItemTitle>
//           <Image type='createRegistry'/>
//           <Arrow />
//         </Item>
//         <Item onClick={(e) => this.menuNavigate(e, 'createapp')}>
//           <ItemTitle>Create App</ItemTitle>
//           <Image type='createApp'/>
//           <Arrow />
//         </Item>
//       </Items>
//     );

//     if (!metamaskUse) {
//       buttons = (
//         <Items>
//           <Item to='https://metamask.io/' target="_blank">
//             <Image type='appStore'/>
//             <ItemTitle>Please use<br/> metamask</ItemTitle>
//           </Item>
//           <Item disabled={true}>
//             <ItemTitle>Create Register</ItemTitle>
//             <Image type='createRegistry'/>
//             <Arrow />
//           </Item>
//           <Item disabled={true}>
//             <ItemTitle>Create App</ItemTitle>
//             <Image type='createApp'/>
//             <Arrow />
//           </Item>
//         </Items>
//       );
//     }

//     let content;

//     if (links === null) {
//       content = (
//         <Container>
//           {buttons}
//           <LinkList>

//             <LinkItem target="_blank" to='https://github.com/cybercongress' icon='github'>GitHub</LinkItem>
//             <LinkItem target="_blank" to='https://github.com/orgs/cybercongress/projects/1' icon='roadmap'>Roadmap</LinkItem>
//             <LinkItem target="_blank" to='http://cybersearch.live' icon='cybernode'>Cybernode</LinkItem>
//             <LinkItem target="_blank" to='http://cybersearch.io' icon='knowledge'>Knowledge</LinkItem>
//             <LinkItem target="_blank" to='https://medium.com/@cybercongress' icon='blog'>Blog</LinkItem>

//           </LinkList>
//         </Container>
//       )
//     } else {

//       if (currentPath === null) {
//         if (loading === false) {
//             content = (
//           <SearchContainer>
//             <Title>Search results:</Title>
//           <ul style={{
//             listStyle: 'none',
//             padding: 0,
//             margin: 0
//           }}>
//             {links.map((link) =>(
//               <SearchItem key={link}>
//                 <a onClick={(e) => this.nav(e, link)}>{link}</a>
//               </SearchItem>
//             ))}
//             </ul>
//             </SearchContainer>
//         ) 
//           } 
               
//       } else {
//         content = (              
//               <iframe style={{ boxSizing: 'border-box', minHeight: '100vh' }} key={time} src={path} onLoad={this.onLoad} width="100%" height="100%" >
//                 iframe not supported!
//              </iframe>
//             )
//       }

         
//     }

//     const { 
//       transactionsCount,
//       blockchains,
//       indexSizeBytes,
//       tokensCount
//     } = this.state;
    
//     return (
//       <div style={{ background: '#eff3f6', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//       <div style={{  left: 0, right: 0, minHeight: (links === null) ? 550 : 109 }}>
//       <Panel open={links !== null}>
        
//           <PanelLeft>
//             <HamburgerMenu open={menuOpen} onClick={this.toggle}>
//               <Menu open={true} >
//                 <MenuItem onClick={(e) => this.menuNavigate(e, 'ethexplorer')} icon='explorer' >Ethereum</MenuItem>
//                 <MenuItem onClick={(e) => this.menuNavigate(e, 'chainger')} icon='chaingear' >Chaingear</MenuItem>
//                 <MenuItem onClick={(e) => this.menuNavigate(e, 'tokens')} icon='tokens' >Tokens</MenuItem>
//               </Menu>
//             </HamburgerMenu>
//             <Logo onClick={this.goMain}>logo</Logo>
//           </PanelLeft>
//           <SearchFormPanel>
//           <SearchForm  onSubmit={this.onSubmit} />
//                 <Legend>
//                    Search in <strong>{nFormatter(transactionsCount, 1)}</strong>&nbsp; transactions in <strong>{blockchains}</strong>&nbsp;
//                    blockchains with <strong>{tokensCount}</strong> parsed tokens. Database size: <strong>{bytesToSize(indexSizeBytes)}</strong>
//                 </Legend>
//           </SearchFormPanel>
//           <PanelRight>
//             <IdBar />
//           </PanelRight>
//  </Panel>
//  </div>
//   <div style={{  flexGrow: 1 }}>
//   {loading && <Loading />}
//   {content}
//   </div>
  
//      </div>
//         );

//   }
// }
import { browserHistory } from 'react-router'



window.navigateBrowser = function(url) {
  alert(url)
}

const apps = {
  cyber: 'cyber/',
  exp: 'exp/',
  chainger: 'chainger/',
  bb: 'bb/',
  eb: 'eb/',
  tokens: 'tokens/',
  appstore: 'appstore/',
  createapp: 'createapp/',
  ipns: '-',
  ipfs: '-'
};

class App extends Component {

  constructor(props) {
    super(props);
    console.log(props);


    // const search = value.split('.')[0];
    // let appName = (value.split('.')[1] || 'CYBER').toLowerCase();
    // if (!apps[appName]) appName = 'cyber';

    // const url = apps[appName] || apps['cyber'];

    let url = null;
    const search = props.params.q || '';
    const app = props.params.app || null;
    
    if (app) {
      let appName = (app || 'CYBER').toLowerCase();
      if (!apps[appName]) appName = 'cyber';

      url = apps[appName] || apps['cyber'];

    }



    this.state = {
      search,
      app,
      url: url,  
      menuOpen: false,    

      metamaskUse: false,

      transactionsCount: 1441341424,
      blockchains: 2,
      indexSizeBytes: 547722617454,

      tokensCount: 0      
    }
  }

  search = (value, hash) => {
    // debugger
    // e.preventDefault();
    // const value = this.refs.input.value;
    if (!value) {
      this.setState({
        search: '',
        app: null,
        url: null,  
        menuOpen: false,            
      });
      this.input.value = '';
      browserHistory.push('/')

      return;
    }
    const search = value.split('.')[0];
    let appName = (value.split('.')[1] || 'CYBER').toLowerCase();
    if (!apps[appName]) appName = 'cyber';

    let url = apps[appName] || apps['cyber'];
    this.setState({
      search,
      app: appName,
      url,
      menuOpen: false
    })

    this.input.value = search;
    browserHistory.push('/' + search + ':' + appName + (hash ? `#${hash}` : ''))
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


  menuNavigate = (e, appName, page) => {
    if (e) e.preventDefault();

    const search = '';
    let url = apps[appName] || apps['cyber'];
    this.setState({
      search,
      app: appName,
      url,
      menuOpen: false
    })

    browserHistory.push('/' + search + ':' + appName)
  }

  onLoad = (e) => {
    const innerWindow = this.refs.iframe.contentWindow;
    //e.target.contentWindow;
    innerWindow.addEventListener('hashchange', () => {
      const hash = innerWindow.location.hash.replace(/#/, '');      
      // console.log(' has been changed to #'+innerWindow.location.hash.replace(/#/, ''));
      window.location.hash = '#' + hash;
    })
    const { search, app } = this.state;


    


    const newApp = innerWindow.location.pathname.replace(/\//g, '');
    let newQ = decodeURIComponent(innerWindow.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent('q').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
    newQ = newQ || '';

    if (newApp !== app || newQ !== search) {
      this.setState({
        app: newApp,
        search: newQ
      })
    }

    browserHistory.push('/' + newQ + ':' + newApp + window.location.hash);

    // console.log('>> ', )

    // console.log(innerWindow.location.pathname + innerWindow.location.search);
    
  }

  // componentDidMount() {
  //   console.log(this.props)
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.url) {
  //     const innerWindow = this.refs.iframe.contentWindow;
  //     innerWindow.addEventListener('hashchange', function(){
  //       console.log(' has been changed to #'+innerWindow.location.hash.replace(/#/, ''));
  //     })
  //   }
  // }

  toggle = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  render() {
    const { app, url, search, menuOpen } = this.state;

    let src = `/${url}?q=${search}${window.location.hash}`;
    if (app === 'ipns') {
      src = `http://ipfs.cyb.ai/ipns/${search}${window.location.hash}`;
    }

    if (app === 'ipfs') {
      src = `http://ipfs.cyb.ai/ipfs/${search}${window.location.hash}`;
    }

    let loading = false;


    const { transactionsCount, blockchains, indexSizeBytes, tokensCount, metamaskUse } = this.state;

    let buttons = (
      <Items>
        <Item onClick={(e) => { e.preventDefault(); this.search('.appstore', '/new') }}>
          <ItemTitle>App Store</ItemTitle>
          <Image type='appStore'/>
          <Arrow />
        </Item>

        <Item  onClick={(e) => { e.preventDefault(); this.search('.chainger', '/new') }}>
          <ItemTitle>Create Register</ItemTitle>
          <Image type='createRegistry'/>
          <Arrow />
        </Item>
        <Item onClick={(e) => { e.preventDefault(); this.search('.createapp', '/new') }}>
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
            <ItemTitle>Create Registry</ItemTitle>
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

    const extend = !!url;

    if (extend) {
      content = (
        <iframe name='iframe' onLoad={this.onLoad} ref='iframe'  style={{ boxSizing: 'border-box', minHeight: '100vh', border: 'none' }} src={src}  width="100%" height="100%" >
                 iframe not supported!  
        </iframe>
      );
    }

    return (
      <div style={{ background: '#eff3f6', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{  left: 0, right: 0, minHeight: (!extend) ? 550 : 109 }}>
      <Panel open={extend}>
        

          <PanelLeft>
            <HamburgerMenu open={menuOpen} onClick={this.toggle}>
              <Menu open={true} >
                <MenuItem onClick={(e) => { e.preventDefault(); this.search('42.exp') }} icon='explorer' >Ethereum</MenuItem>
                <MenuItem onClick={(e) => { e.preventDefault(); this.search('.chainger') }} icon='chaingear' >Chaingear</MenuItem>
                <MenuItem onClick={(e) => { e.preventDefault(); this.search('.tokens') }} icon='tokens' >Tokens</MenuItem>
              </Menu>
            </HamburgerMenu>
            <Logo onClick={(e) => { e.preventDefault(); this.search(); }}>logo</Logo>
          </PanelLeft>
          <SearchFormPanel>
          <div style={{ display: 'flex'}}>
          {app && <div style={{ 
            background: 'rgba(255, 255, 255, 0.25)',
    color: '#fff',
    padding: '14px 30px',
    marginBottom: '5px',
    fontSize: '24px'
  }}>{app}</div>}
          <SearchForm defaultValue={search} inputRef={node => {
            this.input = node;
          }}  onSubmit={this.search} />
          </div>
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

    /*
    return (
      <div>
        {app && <span>{app}</span>}
        <form onSubmit={this.search}>
          <input defaultValue={search} ref='input'/>
        </form>
        <a href='/:chainger'>Chaingear</a>
        {url && <iframe name='iframe' onLoad={this.onLoad} ref='iframe'  style={{ boxSizing: 'border-box', minHeight: '100vh' }} src={src}  width="100%" height="100%" >
                 iframe not supported!  
        </iframe>}
      </div>
    );
    */
  }
}

export default App;
