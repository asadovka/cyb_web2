import * as React from 'react';
const styles = require("./Switcher.less");


export const Switcher = ({ onClick, open }) => (
  <div className={styles.switcher + ' ' + (open ? styles.switcherOpen : '')}>
    <div className={styles.switcherContainer} onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
)
