import * as React from "react";
import { Logo } from '../../components/logo/Logo';

import Footer from '../app/Footer';
import TopMenu from '../app/TopMenu';

import { Header } from '../../components/Header/';
import { AppContainer } from '../../components/AppContainer/';

const App = ({ children }) => (
  <div>
    <Header>
      <div>
        <Logo />
      </div>
      <div>
        <TopMenu />
      </div>
    </Header>
    <AppContainer>
      {children}
    </AppContainer>
    <div>
      <Footer />
    </div>
  </div>
);

export default App;
