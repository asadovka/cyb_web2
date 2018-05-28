import * as React from 'react';

const styles = require("./Paper.less");

export const Paper = ({ children }) => (
  <div className={styles.paper}>
    {children}
  </div>
);
