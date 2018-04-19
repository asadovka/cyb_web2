import * as React from 'react';

const styles = require("./searchPage.less");


export const FilterPanel = ({ children }) => (
  <div className={styles.filterPanelWrapper}>
    <div className={styles.filterPanel}>
       {/*<div className={styles.filterPanelTitle}>
         <span>filter</span>
         <img src={require('./control.png')}/>
       </div>*/}
       <div className={styles.filterPanelContent}>
        {children}
       </div>
    </div>
  </div>
)
