import * as React from 'react';

import SearchForm from '../../components/SearchForm';
import { Logo } from '../../components/logo/Logo';

import { Header, HeaderLogo, HeaderContent } from '../../components/Header';
import { Menu, MenuLint } from '../../components/Menu';


const HeaderContainer = () => (
  <Header>
     <HeaderLogo>
       <Logo />
     </HeaderLogo>
     <HeaderContent>
        <SearchForm />
        <Menu>
          <MenuLint to='/tokens'>Tokens</MenuLint>
          <MenuLint to='/crowdsales'>Crowdsales</MenuLint>
          <MenuLint to='/cybernode'>Cybernode</MenuLint>
          <MenuLint to='/faq'>FAQ</MenuLint>
        </Menu>
     </HeaderContent>
  </Header>
)

export default HeaderContainer;
