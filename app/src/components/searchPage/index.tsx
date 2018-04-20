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


export const Title = ({ children }) => (
  <h2 className={styles.title}>{children}</h2>
);


export const List = ({ children }) => (
  <ul className={styles.list}>
    {children}
  </ul>
);

export const ListTitle = ({ children }) => (
  <h3 className={styles.listTitle}>{children}</h3>
);
