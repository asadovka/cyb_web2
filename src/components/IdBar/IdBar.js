import * as React from 'react';

const styles = require("./IdBar.css");
import { Link } from 'react-router';



function Status ({ className = '', upgradeStore }, { api }) {

  const accountStore = AccountStore.get(api);

  return (
    <div className={styles.container}>
      <DefaultAccount accountStore={ accountStore } />
      <button className={styles.settings}>settings</button>
      <button className={styles.alerts}>alerts</button>
      <button className={styles.balance}>balance</button>
      <button className={styles.userBtn}></button>
    </div>
  );
}

// export default IdBar;


export const Settings = ({ to }) => (
  <Link to={to} className={styles.settings}>Settings</Link>
)

export const Wallet = ({ to }) => (
  <Link to={to} className={styles.balance}>Wallet</Link>
)

