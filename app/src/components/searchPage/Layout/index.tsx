import * as React from 'react';


const styles = require("./searchPageLayout.less");


export const Layout = ({ children }) => (
  <div className={styles.layout}>
    {children}
  </div>
);

export const LayoutSideBar = ({ children }) => (
  <div>
    <div className={styles.layoutSideBar}>
      {children}
    </div>
  </div>
);

export const LayoutContent = ({ children }) => (
  <div className={styles.layoutContent}>
    {children}
  </div>
);
