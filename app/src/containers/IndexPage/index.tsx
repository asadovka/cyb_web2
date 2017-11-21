import * as React from "react";
import {Link} from "react-router";
import {Logo} from "../../components/logo/Logo";
import {PageContainer} from "../../components/PageContainer";
import TopMenu from "../app/TopMenu";
import SearchForm from '../app/SearchForm';
import Layout from '../../components/layout/'
import Footer from '../app/Footer';

import BlockchainStatics from './BlockchainStatics';

export function IndexPage() {
  return (
    <div className='container'>
      <Logo />
      <h2>Blockchain search</h2>
      <span>cyber <span>•</span> Fund</span>
      <TopMenu/>
      <SearchForm/>
      <BlockchainStatics />
      <Footer />
    </div>
  );
}
