import * as React from "react";

const styles = require("./AssetTable.less");

export const Table = ({ children }) => (
  <table className={styles.table}>
    {children}
  </table>
);
