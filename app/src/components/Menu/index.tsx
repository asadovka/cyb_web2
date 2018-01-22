import * as React from 'react';
import { Link } from 'react-router';

const styles = require("./Menu.less");


export const Menu = ({ children }) => (
  <nav className={styles.menu}>
    {children}
  </nav>
)


export const MenuLint = (props) => (
   <Link {...props} className={styles.menuLint} activeClassName={styles.menuLintActive}/>
);
