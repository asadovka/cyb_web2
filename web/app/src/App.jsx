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

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      index: null,
      currentPath: null,
      links: null,

      q: null,
      loading: false,
      open: true
    }
    this.nav = this.nav.bind(this);
    this.search = this.search.bind(this);
    this.link = this.link.bind(this);
  }
  componentDidMount() {
    // axios.post('http://localhost:3002/query', {
    //   ['test']: 'links'
    // }).then(data => {
    //   console.log(data)
    // })
      // getIndex()
      // .then(index => {
      //   this.setState({ index })
      // });    
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
          currentPath: link
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

  render() {
    const { currentPath, links, q, loading, open } = this.state;

    console.log(links);
    const path = currentPath ? `https://ipfs.io/ipfs/${currentPath}/`: null;

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
          <Items>
            <Item>
              <ItemTitle>App Store</ItemTitle>
              <Image type='appStore'/>
              <Arrow />
            </Item>
            <Item>
              <ItemTitle>Create Register</ItemTitle>
              <Image type='createRegistry'/>
              <Arrow />
            </Item>
            <Item>
              <ItemTitle>Create App</ItemTitle>
              <Image type='createApp'/>
              <Arrow />
            </Item>
          </Items>
          <LinkList>

            <LinkItem target="_blank" to='https://github.com/cybercongress' icon='github'>GitHub</LinkItem>
            <LinkItem target="_blank" to='https://github.com/orgs/cybercongress/projects/1' icon='roadmap'>Roadmap</LinkItem>
            <LinkItem target="_blank" to='http://cybersearch.live' icon='cybernode'>Cybernode</LinkItem>
            <LinkItem target="_blank" to='/' icon='dashboard'>Dashboard</LinkItem>
            <LinkItem target="_blank" to='http://cybersearch.io' icon='knowledge'>Knowledge</LinkItem>
            <LinkItem target="_blank" to='https://medium.com/@cybercongress' icon='blog'>Blog</LinkItem>

          </LinkList>
        </Container>
      </BGWrapper>
        );
    }
    // if (currentPath === null) {
    //   return (
    //     <div>
    //       <div>
    //         <input ref='q'/><button onClick={this.search}>search</button>
    //         <ul>
    //         {links.map((link) =>(
    //           <li key={link}>
    //             <a onClick={(e) => this.nav(e, link)}>{link}</a>
    //           </li>
    //         ))}
    //         </ul>
    //         <div>
    //           <input ref='link'/><button onClick={this.link}>link</button>
    //         </div>
    //       </div>
          
    //       {path && <div>
    //         <iframe src={path} width="500" height="500" >
    //           iframe not supported!
    //        </iframe>
    //       </div>}
    //     </div>
    //   );
    // }



    let content;

    if (loading === false) {
      if (currentPath === null) {
        content = (
          <SearchContainer>
            <Title>Search result:</Title>
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
              <MenuItem icon='explorer' to='/'>Etherium explorer</MenuItem>
              <MenuItem icon='chaingear' to='/'>Chaingear</MenuItem>
              <MenuItem icon='tokens' to='/'>Token Monitor</MenuItem>
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
