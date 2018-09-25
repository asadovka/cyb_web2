import React, { Component } from 'react';
import { Settings, Wallet } from '../components/IdBar/IdBar';

import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import DefaultAccount from '../Status/DefaultAccount';
import AccountStore from '../ParityBar/accountStore';
import SignerPending from '../Status/SignerPending';


import styles from './IdBar.css';
import builtinApps from '../Dapps/dappsBuiltin.json';
const walletApp = builtinApps.find(app => app.name === 'Parity Wallet');
const settingsApp = builtinApps.find(app => app.name === 'Node Status');

function IdBar ({ className = '', upgradeStore }, { api }) {

  const accountStore = AccountStore.get(api);

  return (
    <div className={styles.container}>
      <Settings to={`/${settingsApp.id}`} />
      <SignerPending className={ styles.pending }/>
      <Wallet to={`/${walletApp.id}`} />
      <div className={styles.defaultAccount}>
        <DefaultAccount
          accountStore={ accountStore }
        />
      </div>
    </div>
  );
}

IdBar.contextTypes = {
  api: PropTypes.object.isRequired
};

IdBar.propTypes = {
  className: PropTypes.string,
  upgradeStore: PropTypes.object.isRequired
};

export default observer(IdBar);
