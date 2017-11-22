import * as React from "react";
import { Link } from 'react-router';

import { TopMenu, TopMenuLink } from '../../components/TopMenu/'

const TopMenuContainer = () => (
  <TopMenu>
    <TopMenuLink to='/assets'>Assets</TopMenuLink>
    <TopMenuLink to='/funds'>Funds</TopMenuLink>
    <TopMenuLink to='/crowdsales'>Crowdsales</TopMenuLink>
    <TopMenuLink to='/search?q=42'>Blockchains</TopMenuLink>
    <TopMenuLink to='/analitics'>Analytics</TopMenuLink>
    <TopMenuLink to='/cybernode'>Cybernode</TopMenuLink>                           
  </TopMenu>
);

export default TopMenuContainer;
