import * as React from 'react';

const styles = require("./searchPage.less");



export const Title = ({ children }) => (
  <h2 className={styles.title}>{children}</h2>
);


export const List = ({ children }) => (
  <ul className={styles.list}>
    {children}
  </ul>
);

