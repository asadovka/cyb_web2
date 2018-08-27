import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import SearchBox from './SearchBox'
import AppsPanel from './AppsPanel'
import MenuAndLogo from './MenuAndLogo'
import IdBar from './IdBar';

import { LinkList, LinkItem } from '../../components/app/NavigateLinks/NavigateLinks'
import { Container, Panel, PanelLeft, PanelRight, SearchFormPanel, AppIframe, AppContainer, AppHeader, AppContent } from '../../components/app/Layout/Layout'
import Loading from '../../components/app/Loading/Loading';

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
    }
  }

  search = (value, hash, input) => {
    if (!value) {
      this.setState({
        search: '',
        app: null,
        url: null  
      });
      if (input) input.value = '';
      browserHistory.push('/')

      return;
    }
    const search = value.split('.')[0];
    let appName = (value.split('.')[1] || 'CYBER').toLowerCase();
    if (!apps[appName]) appName = 'cyber';
    

    if (input) input.value = search;

    let url = apps[appName] || apps['cyber'];
    this.setState({
      search,
      app: appName,
      url
    })

    browserHistory.push('/' + search + ':' + appName + (hash ? `#${hash}` : ''))
  } 


  onLoad = (innerWindow) => {
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

  render() {
    const { app, url, search } = this.state;

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
        <AppIframe name='iframe' iframeOnLoad={this.onLoad} src={src}  width="100%" height="100%" >
          iframe not supported!  
        </AppIframe>
      );
    }

    return (
      <AppContainer>
        <AppHeader open={extend}>
          <Panel open={extend}>
              <PanelLeft>
                <MenuAndLogo search={this.search} />
              </PanelLeft>

              <SearchFormPanel>
                <SearchBox 
                  app={app} 
                  inputText={search} 
                  onSearch={this.search} 
                />
              </SearchFormPanel>
              <PanelRight>
                <IdBar />
              </PanelRight>
          </Panel>
        </AppHeader>

        <AppContent>
          {loading && <Loading />}
          {content}
        </AppContent>

     </AppContainer>
);

  }
}

export default App;
