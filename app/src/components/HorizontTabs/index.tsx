import * as React from "react";
const styles = require("./HorizontTabs.less");
import { Link } from 'react-router';
var cx = require('classnames');


export const Tabs = ({ children }) => (
  <ul className={styles.tabs}>
    {children}
  </ul>
)


export const Tab = (props: any) => (
  <li className={styles.tab + ' ' + (props.isActive ? styles.isActive : '')}>
    <Link {...props} />
  </li>
);
