import * as React from 'react';

const styles = require("./AppLayout.less");

export const Layout = ({ children }) => (
  <div className={styles.layout}>
    {children}
  </div>
);

export const AppHeader = ({ children, open }) => (
  <div className={styles.appHeader + ' ' + (open ? styles.appHeaderOpen : '')}>
    <div className={styles.appHeaderContainer + ' container'}  style={{ width: 900 }}>
      {children}
    </div>
  </div>
);

export const AppContent = ({ children, open }) => (
  <div className={styles.appContent + ' ' + (open ? styles.appContentOpen: '')}>
    <div className='container' style={{ width: 900 }}>
      {children}
    </div>
  </div>
);

export const AppMenu = ({ children, open }) => (
  <div className={styles.appMenu + ' ' + (open ? styles.appMenuOpen : '')}>
    {children}
  </div>
);

export const SearchForm = () => (
  <form action='/search' className={styles.searchForm}>
    <input name='q' className={styles.searchFormInput} placeholder='Adds' />
  </form>
);

import { Link } from 'react-router';

export const Logo = () => (
  <Link className={styles.logo} to='/'>
    <img  src={require('./cyber_fund_logo.svg')} />
  </Link>
);


export const Menu = ({ children }) => (
  <ul className={styles.menu}>
    {children}
  </ul>
);

export const MenuItem = ({ children, to, icon, open }) => (
  <li className={styles.menuItem}>
    <Link to={to} activeClassName={styles.menuItemActive} className={styles['menuItem_'+ icon] + ' ' + (open ? styles.menuItemActiveOpen: '')} >
      {children}
    </Link>
  </li>
);

export const Switcher = ({ onClick }) => (
  <div className={styles.switcher}>
    <button onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
)
