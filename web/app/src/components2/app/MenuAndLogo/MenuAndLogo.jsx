import * as React from 'react';
import { Link } from 'react-router';

const cx = require('classnames');
const styles = require("./MenuAndLogo.less");

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

class HamburgerMenu extends React.Component {
  render() {
    const { open, onClick } = this.props;

    return (
      <div className={styles.hamburgerMenu}>
        <div onClick={onClick} className={cx(styles.switcher, {[styles.switcherOpen]: open })}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={cx(styles.popover, {[styles.popoverOpen]: open })}>
        {this.props.children}
        </div>
      </div>
    );
  }
}

export const Logo = ({ ...props }) => (
  <div {...props} className={styles.logo} />
);

export { HamburgerMenu };