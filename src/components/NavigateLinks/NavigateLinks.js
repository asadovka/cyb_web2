import * as React from 'react';

import { Link as LinkRouter} from 'react-router';

const Link = (props) => {
  if (/^https?:\/\//.test(props.to)) return <a href={props.to} {...props}/>

  return <LinkRouter {...props} />
};

const styles = require("./NavigateLinks.css");

export const LinkList = ({ children }) => (
  <nav className={styles.linkList}>
    {children}
  </nav>
);

export const LinkItem = ({ children, to, icon, ...props }) => (
  <Link to={to} className={styles.linkItem + ' ' + styles[`linkItem${icon}`]} {...props}>
    {children}
  </Link>
);
