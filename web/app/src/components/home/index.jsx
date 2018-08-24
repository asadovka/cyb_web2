import * as React from 'react';

const styles = require("./Home2.less");

import { Link as LinkRouter} from 'react-router';

const Link = (props) => {
  if (/^https?:\/\//.test(props.to)) return <a href={props.to} {...props}/>

  return <LinkRouter {...props} />
};

export const Container = ({ children }) => (
  <div className={styles.container}>
    {children}
  </div>
);


export const BGWrapper = ({ children }) => (
  <div style={{   backgroundColor: '#eff3f6', minHeight: '100vh'}}>
    {children}
  </div>
);

export { MetamaskLogo } from './MetamaskLogo';


export const TopPanel = ({ children }) => (
  <div className={styles.topPanel}>
    {children}
  </div>
);

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