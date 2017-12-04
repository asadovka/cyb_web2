import * as React from "react";
import {Link} from "react-router";
import {Logo} from "../../components/logo/Logo";
import TopMenu from "../app/TopMenu";
import SearchForm from '../app/SearchForm';
import Footer from '../app/Footer';

import BlockchainStatics from './BlockchainStatics';

import CentredContainer from '../../components/CentredContainer/';

import { Header } from '../../components/Header/';

// import { Title, BigLogo } from '../../components/Title/';

import { connect } from 'react-redux';

class IndexPage extends React.Component<any, any> {
  componentDidMount() {
    this.props.getStatistics();
  }
  
  render() {
    return (
      <div>
        <Header>
          <Logo />
        </Header>

        <CentredContainer>
          {/*<Title>Blockchain search</Title>*/}
           {/*<BigLogo />*/}
          <TopMenu/>
          <SearchForm/>
          <BlockchainStatics />
        </CentredContainer>

        <Footer />
      </div>
    );    
  }
}

import { getStatistics } from '../../modules/search';

export default connect(
  null,
  { getStatistics }
)(IndexPage);
