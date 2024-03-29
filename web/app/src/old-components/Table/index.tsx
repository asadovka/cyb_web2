import * as React from "react";
import { Link } from 'react-router';

const cx = require('classnames');

const styles = require("./Table.less");

import Table, { TableBody, TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';

const CustomeTable = (props) => (
  <Table {...props} className={styles.table}/>
) 

export { TableBody, TableCell, TableHead, TableRow, TableSortLabel };
export default CustomeTable;
