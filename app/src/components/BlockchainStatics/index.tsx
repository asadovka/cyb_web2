import * as React from "react";

const styles = require("./index.less");

const cx = require('classnames');

export const Container = ({ children }) => (
  <div className={styles.container}>
    {children}
  </div>
)

export const Item = ({ children, comingSoon }) => (
  <div className={cx(styles.item, {[styles.comingSoon]: comingSoon })}>
    {children}
  </div>
)

const icons = {
  cap: styles.cap,
  search: styles.search,
  portfolio: styles.portfolio
}

export const Title = ({ children, icon }) => {
  const css = styles.title + ' ' + icons[icon];
  return (
    <h3 className={css}>
      <span>{children}</span>
    </h3>
  );
}


export const Table = ({ children }) => (
  <table className={styles.table}>
    {children}
  </table>
);

export const DataContainer = ({ children }) => (
  <div className={styles.dataContainer}>
    {children}
  </div>
);


export const Value = ({ children }) => (
  <p className={styles.value}>
    {children}
  </p>
)

export const Label = ({ children }) => (
  <p className={styles.label}>
    {children}
  </p>
);

export const List = (props) => (<ul {...props} className={styles.list} />);

export const Delta = ({ value }) => {
  const css = styles.delta + ' ' + (value < 0 ? styles.negative : ' ');
  return (
    <p className={css}>
      <span>{Math.abs(value)}%</span>
    </p>
  );
}
