import React, { Component } from 'react';

import { Link } from 'react-router';

import AppsPanel from './AppsPanel';

import {
  Container, Panel, PanelLeft, PanelRight,
  SearchFormPanel, AppIframe, AppContainer,
  AppHeader, AppContent
} from '../../components/Layout/Layout'

import { LinkList, LinkItem } from '../../components/NavigateLinks/NavigateLinks'


class Home extends Component {
  render() {

    return (
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
    // return (
    //   <AppContainer>
    //     <AppContent>
    //     <Container>
    //       <AppsPanel />
    //     </Container>
    //     </AppContent>
    //     <Link to='/apps'>apps</Link>
    //   </AppContainer>
    // );
  }
}


export default Home;
