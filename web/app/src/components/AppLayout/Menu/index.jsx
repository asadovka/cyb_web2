import * as React from 'react';
import { Link } from 'react-router';

const styles = require("./Menu.less");


export const Menu = ({ children, open }) => (
  <ul className={styles.menu}>
    {React.Children.map(children, child => React.cloneElement(child, { 
      open
    }))}
  </ul>
);

export const MenuItem = ({ children, to, icon, open = true, ...props }) => (
  <li className={styles.menuItem}>
    {to ? (<Link to={to} activeClassName={styles.menuItemActive} className={styles['menuItem_'+ icon] + ' ' + (open ? styles.menuItemActiveOpen: '')} {...props} >
      {children}
    </Link>) : <a href='/' className={styles['menuItem_'+ icon] + ' ' + (open ? styles.menuItemActiveOpen: '')} {...props}>{children}</a>}
  </li>
);
