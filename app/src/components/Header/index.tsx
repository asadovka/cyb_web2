import * as React from 'react';

const styles = require("./Header.less");


export const Header = ({ children }) => (
  <div className={styles.header}>
    {children}
  </div>
)

export const HeaderLogo = ({ children }) => (
  <div className={styles.headerLogo}>
    {children}
  </div>
)

export const HeaderContent = ({ children }) => (
  <div className={styles.headerContent}>
    <div className={styles.headerContentContainer}>
    {children}
    </div>
  </div>
)
