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

export const AppContent = ({ children, open, withMenu }) => (
  <div className={styles.appContent + ' ' + (open ? styles.appContentOpen: '') + ' ' + (withMenu ? styles.appContentWithMenu: '')}>  
      {children}
  </div>
);

export const AppMenu = ({ children, open }) => (
  <div className={styles.appMenu + ' ' + (open ? styles.appMenuOpen : '')}>
    {children}
  </div>
);


export const AppSecondMenu = ({ children, open }) => (
  <div className={styles.appSecondMenu  + ' ' + (open ? styles.appSecondMenuOpen: '')}>
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


export const LayoutSwitcher = ({ children, open }) => (
  <div className={styles.layoutSwitcher + ' ' + (open ? styles.layoutSwitcherOpen : '')}>
    {children}
  </div>
);


