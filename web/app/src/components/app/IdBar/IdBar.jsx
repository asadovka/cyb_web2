import * as React from 'react';

const styles = require("./IdBar.less");


const IdBar = (props) => (
  <div className={styles.container}>
    <button className={styles.settings}>settings</button>
    <button className={styles.alerts}>alerts</button>
    <button className={styles.balance}>balance</button>
    <button className={styles.userBtn}></button>
  </div>
);

export default IdBar;
