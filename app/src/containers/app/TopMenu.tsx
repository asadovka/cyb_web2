import * as React from "react";
import { Link } from 'react-router';

import { TopMenu, TopMenuLink } from '../../components/TopMenu/'

const TopMenuContainer = () => (
  <TopMenu>
    <TopMenuLink isComingSoon={false} to='/tokens'>Tokens</TopMenuLink>
    <TopMenuLink isComingSoon={true} to='/funds'>Funds</TopMenuLink>
    <TopMenuLink isComingSoon={false} to='/crowdsales'>Crowdsales</TopMenuLink>
    <TopMenuLink isComingSoon={true} to='/blockchains'>Blockchains</TopMenuLink>
    <TopMenuLink isComingSoon={true} to='/analitics'>Analytics</TopMenuLink>
    <TopMenuLink isComingSoon={false} to='/cybernode'>Cybernode</TopMenuLink>                           
  </TopMenu>
);

export default TopMenuContainer;
