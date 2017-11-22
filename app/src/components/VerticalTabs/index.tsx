
import * as React from "react";

const styles = require("./VerticalTabs.less");
import { Link } from 'react-router';

export const Tabs = (props) => (
  <ul
    {...props}
    className={styles.tabs}
  />
)


export const Tab = ({ isActive, ...props }) => (
  <li className={styles.tab + ' ' + (isActive ? styles.isActive : ' ')}>
    <Link
      {...props}      
    />
  </li>
)
