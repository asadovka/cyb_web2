import * as React from "react";
import {Link} from "react-router";
import {Logo} from "../../components/logo/Logo";
import TopMenu from "../app/TopMenu";
import SearchForm from '../app/SearchForm';
import Footer from '../app/Footer';

import BlockchainStatics from './BlockchainStatics';


import { Header } from '../../components/Header/';

import { Title, BigLogo } from '../../components/Hero/';

import { connect } from 'react-redux';

class IndexPage extends React.Component {
  componentDidMount() {
    this.props.getStatistics();
  }
  
   // <Title>Blockchain search</Title>
   //        <BigLogo />
   //        <TopMenu/>
   //        <SearchForm/>
  render() {
    return (
      <div>
               
          <BlockchainStatics />
        

        {/*<Footer />*/}
      </div>
    );    
  }
}

import { getStatistics } from '../../modules/search';

export default connect(
  null,
  { getStatistics }
)(IndexPage);
