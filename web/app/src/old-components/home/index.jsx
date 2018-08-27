import * as React from 'react';

const styles = require("./Home2.less");

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