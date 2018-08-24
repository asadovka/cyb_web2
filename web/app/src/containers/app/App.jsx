import React, { Component } from 'react';
import {
  Layout,
  AppHeader,
  AppContent,
  AppMenu,
  Menu, MenuItem,
} from '../../components/AppLayout/';


import {
  Container,
  BGWrapper,
  TopPanel,
  LinkList,
  LinkItem
} from '../../components/home/';

import {
  SearchContainer,
  Title,
  SearchItem
} from '../../components/searchresults/';

import IdBar from '../../components/idbar/';
import Cyb from '../../utils/cyb';

const cyb = new Cyb('http://cyberd.network');

import {
  Panel, PanelLeft, PanelRight,
  SearchFormPanel ,
  Logo,
  HamburgerMenu,
  Loading
} from '../../components/Test/';

import axios from 'axios'; 
import { browserHistory } from 'react-router'




import SearchBox from './SearchBox'
import AppsPanel from './AppsPanel'




window.navigateBrowser = function(url) {
  alert(url)
}

const apps = {
  cyber: 'cyber/',
  exp: 'exp/',
  chainger: 'chainger/',
  bb: 'bb/',
  bt: 'bt/',
  bc: 'bc/',
  eb: 'eb/',
  et: 'et/',
  ec: 'ec/',
  eu: 'eu/',
  tokens: 'tokens/',
  token: 'token/',
  appstore: 'appstore/',
  createapp: 'createapp/',
  ipns: '-',
  ipfs: '-'
};

class App extends Component {

  constructor(props) {
    super(props);

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
      menuOpen: false
    }
  }

  search = (value, hash) => {
    if (!value) {
      this.setState({
        search: '',
        app: null,
        url: null,  
        menuOpen: false,            
      });
      //this.input.value = '';
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

    browserHistory.push('/' + search + ':' + appName + (hash ? `#${hash}` : ''))
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


    
    let newApp = innerWindow.location.pathname.replace(/apps\//g, '');
    newApp = newApp.replace(/\//g, '');

    let newQ = decodeURIComponent(innerWindow.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent('q').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
    newQ = newQ || '';

    if (newApp !== app || newQ !== search) {
      let url = apps[newApp] || apps['cyber'];
      this.setState({
        app: newApp,
        search: newQ,
        url
      })
    }

    browserHistory.push('/' + newQ + ':' + newApp + window.location.hash);
  }

  toggle = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  render() {
    const { app, url, search, menuOpen } = this.state;

    let src = `/apps/${url}?q=${search}${window.location.hash}`;
    if (app === 'ipns') {
      src = `http://ipfs.cyb.ai/ipns/${search}${window.location.hash}`;
    }

    if (app === 'ipfs') {
      src = `http://ipfs.cyb.ai/ipfs/${search}${window.location.hash}`;
    }

    let loading = false;

    let content = (
      <Container>
        <AppsPanel search={this.search} />
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
            <SearchBox app={app} inputText={search} onSearch={this.search} />
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
