import * as React from "react";
import { Link } from 'react-router';

import { TopMenu, TopMenuLink } from '../../components/TopMenu/'

const TopMenuContainer = () => (
  <TopMenu>
    <TopMenuLink to='/'>Assets</TopMenuLink>
    <TopMenuLink to='/'>Funds</TopMenuLink>
    <TopMenuLink to='/'>Crowdsales</TopMenuLink>
    <TopMenuLink to='/search?q=42'>Blockchains</TopMenuLink>
    <TopMenuLink to='/analitics'>Analytics</TopMenuLink>
    <TopMenuLink to='/'>Cybernode</TopMenuLink>                           
  </TopMenu>
);

export default TopMenuContainer;
