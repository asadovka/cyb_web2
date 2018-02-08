import * as React from 'react';

const styles = require("./Title.less");

export const Titile = ({ children, inline }) => (
  <h2 className={styles.titile + ' ' + (inline ? styles.titileInline : '')}>
    {children}
  </h2>
);
