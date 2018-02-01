import * as React from 'react';

const styles = require("./AppLayout.less");

export const Layout = ({ children }) => (
  <div className={styles.layout}>
    {children}
  </div>
);

export const AppHeader = ({ children }) => (
  <div className={styles.appHeader}>
    <div className='container'>
      {children}
    </div>
  </div>
);

export const AppContent = ({ children }) => (
  <div className={styles.appContent}>
    <div className='container'>
      {children}
    </div>
  </div>
);

export const AppMenu = ({ children }) => (
  <div className={styles.appMenu}>
    <div className={styles.appMenuOpen}>
      {children}
    </div>
  </div>
);

export const SearchForm = () => (
  <form action='/search' className={styles.searchForm}>
    <input name='q' className={styles.searchFormInput} placeholder='Adds' />
  </form>
);

import { Link } from 'react-router';

export const Logo = () => (
  <Link to='/'>
    <img className={styles.logo} src={require('./cyber_fund_logo.svg')} />
  </Link>
);


export const Menu = ({ children }) => (
  <ul className={styles.menu}>
    {children}
  </ul>
);

export const MenuItem = ({ children, to, icon }) => (
  <li className={styles.menuItem}>
    <Link to={to} activeClassName={styles.menuItemActive} className={styles['menuItem_'+ icon]} >
      {children}
    </Link>
  </li>
);

