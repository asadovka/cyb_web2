import React, { Component } from 'react';



const AllApps = ({ apps, nav }) => (
  <div>
    <ul>
      {apps.map(app => (
        <li key={app.name}>
          <a href='/' onClick={(e) => {
            e.preventDefault();
            nav(app)
          }}>{app.name}</a>
        </li>
      ))}
    </ul>
  </div>
)

import axios from 'axios';

import {
  Container,
  BGWrapper,
  TopPanel,
  MetamaskLogo,
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
  SearchForm
} from './components/SearchForm/'


import {
  Layout,
  AppHeader,
  AppContent,
  AppMenu,
} from './components/AppLayout/';

import Cyb from './utils/cyb';

// http://cyberd.network
const cyb = new Cyb('http://35.204.133.75');
// 'http://localhost:3002');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      index: null,
      currentPath: null,
      links: null,
      q: null
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

  render() {
    const { apps, currentPath, links } = this.state;
    console.log(links);
    const path = currentPath ? `https://ipfs.io/ipfs/${currentPath}/`: null;

    if (links === null) {
    return (
      <BGWrapper>
        <TopPanel>
          <Container>
            <SearchForm onSubmit={this.onSubmit}/>
          </Container>
        </TopPanel>
        <Container>
          <Items>
            <Item>
              <ItemTitle>400 B USD</ItemTitle>
              <span>Total market cap</span>
              <Arrow />
            </Item>
            <Item>
              <ItemTitle>37</ItemTitle>
              <span>Chaingear registries</span>
              <Arrow />
            </Item>
            <Item>
              <ItemTitle>3.4 BTC</ItemTitle>
              <span>Portfolio volume</span>
              <Arrow />
            </Item>
          </Items>
          <LinkList>
            <LinkItem to='/' icon='github'>GitHub</LinkItem>
            <LinkItem to='/' icon='roadmap'>Roadmap</LinkItem>
            <LinkItem to='/' icon='cybernode'>Cybernode</LinkItem>
            <LinkItem to='/' icon='dashboard'>Dashboard</LinkItem>
            <LinkItem to='/' icon='knowledge'>Knowledge</LinkItem>
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

    return (
      <Layout>
        <AppHeader>
          <SearchForm onSubmit={this.onSubmit}/>
        </AppHeader>
        <AppMenu>
        </AppMenu>
        <AppContent>
          {currentPath === null ? (
              <ul>
                {links.map((link) =>(
                  <li key={link}>
                    <a onClick={(e) => this.nav(e, link)}>{link}</a>
                  </li>
                ))}
                </ul>
            ): (
              <iframe src={path} width="100%" height="500" >
                iframe not supported!
             </iframe>
            )}
        </AppContent>
      </Layout>
    );
  }
}

export default App;
