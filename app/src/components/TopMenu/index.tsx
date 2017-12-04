import * as React from "react";
import { Link } from 'react-router';

const cx = require('classnames');

const styles = require("./index.less");


export const TopMenu = ({ children }) => (
  <nav className={styles.topMenu}>
    {children}
  </nav>
);


export const TopMenuLink = ({ children, to, isComingSoon }) => (
  (!isComingSoon ? (
    <Link 
      activeClassName={styles.topMenuLinkActive} 
      className={cx(styles.topMenuLink, {[styles.isComingSoon]: isComingSoon })} 
      to={to} >{children}</Link>
      ) : (
      <span className={cx(styles.topMenuLink, {[styles.isComingSoon]: isComingSoon })}>
        {children}
      </span>
    ))
)
