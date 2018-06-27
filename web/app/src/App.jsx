import React, { Component } from 'react';




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


const apps = {
  chainger: 'ipns/QmSsT1RV6yZiCfCz5hamwTn2NxTJMoEJ8DkEgnUYtFVpsS',
  tokens: 'ipfs/QmXmhCQBV5bGAnSPR9KMXUj5MeywFpMpdUVXAgRvt2qx1f',
  ethexplorer: 'ipfs/QmchRThL7at2eQmGKQVSv4FQsqjrYoaU4y7p2KxTVnzmkB',
  createapp: 'ipfs/QmfTMXbrEyM1TB8BxF6pt3cXYZWLmyruCWUX9h4pvnGCWr'
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
      open: true,
      metamaskUse: false
    }
    this.nav = this.nav.bind(this);
    this.search = this.search.bind(this);
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
          currentPath: 'ipfs/' + link
        })        
      })
  }
  search() {
    var q = this.refs.q.value;
    cyb.search(q)
      .then(links => {
        this.setState({
          links
        })
      })
  }

  onSubmit = (value) => {
    cyb.search(value)
      .then(links => {
        this.setState({
          links,
          q: value,
          currentPath: null
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
      open: !this.state.open
    })
  }

  menuNavigate = (e, appName) => {
    if (e) e.preventDefault();

    this.setState({
      links: [],
      currentPath: apps[appName],
      open: false
    })
  }

  render() {
    const { currentPath, links, q, loading, open, metamaskUse } = this.state;

    console.log(links);
    const path = currentPath ? `http://ipfs.cyb.ai/${currentPath}/`: null;

    let buttons = (
      <Items>
        <Item onClick={(e) => this.menuNavigate(e, 'createapp')}>
          <ItemTitle>App Store</ItemTitle>
          <Image type='appStore'/>
          <Arrow />
        </Item>
        <Item onClick={(e) => this.menuNavigate(e, 'chainger')}>
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

    if (links === null) {
    return (
      <BGWrapper>
        <TopPanel>
          <Container>
            <SearchForm onSubmit={this.onSubmit}/>
            <Legend>
              Search in <strong>134M</strong> transactions in <strong>2</strong>&nbsp;
              blockchains with <strong>135</strong> parsed tokens. Database size: <strong>369</strong> GBs
            </Legend>
          </Container>
        </TopPanel>
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
      </BGWrapper>
        );
    }


    let content;

    if (loading === false) {
      if (currentPath === null) {
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
      } else {
        content = (
              <iframe src={path} width="100%" height="500" >
                iframe not supported!
             </iframe>
            )
      }

    } else {
      content = (
        <div>
          loading...
        </div>
      );
    }
    const ss = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%'
    }
    return (
      <Layout 
          open={open}
          onToggle={this.toggle}
          onLogoClick={this.goMain}
        >
          <AppHeader>
            <div style={ss}>
              <div style={{ width: 750 }}>
                <SearchForm defaultValue={q} onSubmit={this.onSubmit}/>
                <Legend>
                   Search in <strong>134M</strong> transactions in <strong>2</strong>&nbsp;
                   blockchains with <strong>135</strong> parsed tokens. Database size: <strong>369</strong> GBs
                </Legend>
              </div>
              <div>
                <IdBar />
              </div>
            </div>             
          </AppHeader>
          <AppMenu onLogoClick={this.goMain}>
            <Menu open={open} >
              <MenuItem onClick={(e) => this.menuNavigate(e, 'ethexplorer')} icon='explorer' >Ethereum</MenuItem>
              <MenuItem onClick={(e) => this.menuNavigate(e, 'chainger')} icon='chaingear' >Chaingear</MenuItem>
              <MenuItem onClick={(e) => this.menuNavigate(e, 'tokens')} icon='tokens' >Token</MenuItem>
            </Menu>
          </AppMenu>    
          <AppContent>
            {content}
          </AppContent>
        </Layout>
    );
  }
}

export default App;
