import * as React from 'react';

const styles = require("./Chaingear.less");

export const Container = ({ children }) => (
  <div className={styles.container}>
    {children}
  </div>
);

export const SideBar = ({ children }) => (
  <div className={styles.sideBar}>
    {children}
  </div>
);

export const Content = ({ children }) => (
  <div className={styles.content}>
    {children}
  </div>
);

export const Label = ({ children, color }) => (
  <label className={styles.label} style={{ background: color }}>
    {children}
  </label>
);

export const Panel = ({ children, title }) => (
  <div className={styles.panel}>
    {title && <h3 className={styles.panelTitle}>{title}</h3>}
    <div className={styles.panelContent}>
      {children}
    </div>
  </div>
);


  // <div className={styles.code}>
  //   {children}
  // </div>




export const Control = ({ children, title }) => (
  <div className={styles.control}>
    <label className={styles.controlLabel}>{title}</label>
    <div className={styles.controlComponent}>{children}</div>
  </div>
);


export const TotalCost = ({ value }) => (
  <div className={styles.totalCost}>
    <span>Total cost:</span>
    <span>{value} gwei</span>
  </div>
);


export const CreateButton = ({ children, ...ptops }) => (
  <button  className={styles.createButton} {...ptops}>
    {children}
  </button>
);

export const FieldsTable = ({ children }) => (
  <table className={styles.fieldsTable}>
    {children}
  </table>
);


