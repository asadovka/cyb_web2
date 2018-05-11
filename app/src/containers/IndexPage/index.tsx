import * as React from "react";
import {Link} from "react-router";


import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

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
} from '../../components/home/';

import {
  SearchForm
} from '../../components/SearchForm/'


class IndexPage extends React.Component {
  componentDidMount() {
    this.props.getStatistics();
  }

  onSubmit = (value) => {
    browserHistory.push(`/search?q=${value}`);
  }

  render() {
    return (
  <BGWrapper>
    <TopPanel>
      <MetamaskLogo />
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
        <Item to='/'>
          <ItemTitle>400 B USD</ItemTitle>
          <span>Total market cap</span>
          <Arrow />
        </Item>
        <Item to='/registers/new'>
          <ItemTitle gray={true} >Create register</ItemTitle>
          <Image type='register'/>
        </Item>
        <Item to='/'>
          <ItemTitle gray={true}>Create portfolio</ItemTitle>
          <Image type='portfolio'/>
        </Item>
      </Items>
      <LinkList>
        <LinkItem target="_blank" to='https://github.com/cybercongress' icon='github'>GitHub</LinkItem>
        <LinkItem target="_blank" to='https://github.com/orgs/cybercongress/projects/1' icon='roadmap'>Roadmap</LinkItem>
        <LinkItem target="_blank" to='http://cybersearch.live' icon='cybernode'>Cybernode</LinkItem>
        <LinkItem target="_blank" to='/' icon='dashboard'>Dashboard</LinkItem>
        <LinkItem target="_blank" to='http://cybersearch.io' icon='knowledge'>Knowledge</LinkItem>
      </LinkList>
    </Container>
  </BGWrapper>
    );    
  }
}

import { getStatistics } from '../../modules/search';

export default connect(
  null,
  { getStatistics }
)(IndexPage);
