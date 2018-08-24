import * as React from 'react';

const styles = require("./AppLayout.less");

import { Link } from 'react-router';

export const Logo = ({ onClick }) => (
  <span className={styles.logo} onClick={onClick}>
    <img  src={require('./logo.svg')} />
  </span>
);

export const AppHeader = ({ children, open, onToggle, onLogoClick }) => {
  return (
    <div className={styles.appHeader + ' ' + (open ? styles.appHeaderOpen : '')}>
      <LayoutSwitcher>
        <Switcher 
          onClick={onToggle}
          open={open}
        />
      </LayoutSwitcher>    
      <div className={styles.logoContainer}>
        <Logo onClick={onLogoClick} />
      </div>
      <div className={styles.appHeaderContainer}  style={{ width: 1090 }}>
        {children}
      </div>
    </div>
  );
}

export const AppContent = ({ children, open, withMenu }) => (
  <div className={styles.appContent + ' ' + (open ? styles.appContentOpen: '') + ' ' + (withMenu ? styles.appContentWithMenu: '')}>  
      {children}
  </div>
);


export const AppMenu = ({ children, open, onLogoClick }) => (
  <div className={styles.appMenuWrapper + ' ' + (open ? styles.appMenuWrapperOpen : '')}>
  <div className={styles.appMenu + ' ' + (open ? styles.appMenuOpen : '')}>
    {/*<div className={styles.menuLogoContainer} onClick={onLogoClick}>
    </div>*/}
    {children}
  </div>
  </div>
);


export const AppSecondMenu = ({ children, open }) => (
  <div className={styles.appSecondMenu  + ' ' + (open ? styles.appSecondMenuOpen: '')}>
    {children}
  </div>
);

import { Switcher } from './Switcher/';
export { Switcher };

export const LayoutSwitcher = ({ children, open }) => (
  <div className={styles.layoutSwitcher + ' ' + (open ? styles.layoutSwitcherOpen : '')}>
    {children}
  </div>
);


export const Layout = ({ children, open, onToggle, onLogoClick }) => {
  const childrenWithProps = React.Children.map(children, child => {
    if (!child) return child;
    
    return React.cloneElement(child, { open, onToggle, onLogoClick });
  });
  return (
    <div className={styles.layout}>
      {childrenWithProps}
    </div>
  );
}
