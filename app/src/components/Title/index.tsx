import * as React from 'react';

const styles = require("./Title.less");

export const Title = ({ children, inline }) => (
  <h2 className={styles.titile + ' ' + (inline ? styles.titileInline : '')}>
    {children}
  </h2>
);


export const Badge = ({ children }) => (
  <span className={styles.badge} >
    {children}
  </span>
);
