import * as React from 'react';

const styles = require("./AppLayout.less");

export const Layout = ({ children }) => (
  <div className={styles.layout}>
    {children}
  </div>
);

export const AppHeader = ({ children, open }) => (
  <div className={styles.appHeader + ' ' + (open ? styles.appHeaderOpen : '')}>
    <div className={styles.appHeaderContainer + ' container'}  style={{ width: 1090 }}>
      {children}
    </div>
  </div>
);

export const AppContent = ({ children, open }) => (
  <div className={styles.appContent + ' ' + (open ? styles.appContentOpen: '')}>
    <div className='container' style={{ width: 1090 }}>
      {children}
    </div>
  </div>
);

export const AppMenu = ({ children, open }) => (
  <div className={styles.appMenu + ' ' + (open ? styles.appMenuOpen : '')}>
    {children}
  </div>
);

export { SearchForm } from './SearchForm/';

import { Link } from 'react-router';

export const Logo = () => (
  <Link className={styles.logo} to='/'>
    <img  src={require('./cyber_fund_logo.svg')} />
  </Link>
);


export { Menu, MenuItem } from './Menu/';
export { Switcher } from './Switcher/';


export const LayoutSwitcher = ({ children }) => (
  <div className={styles.layoutSwitcher}>
    {children}
  </div>
);


