import * as React from "react";
import { Logo } from '../../components/logo/Logo';

import Footer from '../app/Footer';
import TopMenu from '../app/TopMenu';


const App = ({ children }) => (
  <div>
    <div className='container'>
    <div className='navbar-menu'>
      <div className="navbar-start">
        <Logo />
      </div>
      <div className='navbar-end'>
        <TopMenu />
      </div>
    </div>
    <div>
      {children}
    </div>
    </div>
    <div>
      <Footer />
    </div>
  </div>
);

export default App;
