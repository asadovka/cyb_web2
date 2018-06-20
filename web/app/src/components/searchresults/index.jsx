import * as React from 'react';

const styles = require("./searchresults.less");


export const SearchContainer = ({ children }) => (
  <div className={styles.searchContainer}>
    {children}
  </div>
);


export const Title = ({ children }) => (
  <h3 className={styles.title}>
    {children}
  </h3>
);


export const SearchItem = ({ children }) => (
  <li className={styles.searchItem}>
    {children}
  </li>
);
