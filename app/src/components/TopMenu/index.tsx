import * as React from "react";
import { Link } from 'react-router';


const styles = require("./index.less");


export const TopMenu = ({ children }) => (
  <nav className={styles.topMenu}>
    {children}
  </nav>
);


export const TopMenuLink = ({ children, to }) => (
  <Link activeClassName={styles.topMenuLinkActive} className={styles.topMenuLink} to={to} >{children}</Link>
)
