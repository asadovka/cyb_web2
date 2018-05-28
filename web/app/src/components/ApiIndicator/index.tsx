import * as React from "react";

const styles = require("./ApiIndicator.less");

const cx = require('classnames');

// export const Table = ({ children }) => (
//   <table className={styles.table}>
//     {children}
//   </table>
// );


export const Indicator = ({ available }) => (
  <span className={cx(styles.indicator, { [styles.available]: available })} />
);


export const Title = ({ children }) => (
  <h2 className={styles.title}>{children}</h2>
)

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

export const IndicatorTable = ({ children }) => (
  <Table className={styles.table}>
    {children}
  </Table>
);
