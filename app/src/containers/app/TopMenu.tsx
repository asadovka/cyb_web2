import * as React from "react";
import { Link } from 'react-router';

import { TopMenu, TopMenuLink } from '../../components/TopMenu/'

const TopMenuContainer = () => (
  <TopMenu>
    <TopMenuLink to='/tokens'>Tokens</TopMenuLink>
    <TopMenuLink to='/funds'>Funds</TopMenuLink>
    <TopMenuLink to='/crowdsales'>Crowdsales</TopMenuLink>
    <TopMenuLink to='/blockchains'>Blockchains</TopMenuLink>
    <TopMenuLink to='/analitics'>Analytics</TopMenuLink>
    <TopMenuLink to='/cybernode'>Cybernode</TopMenuLink>                           
  </TopMenu>
);

export default TopMenuContainer;
