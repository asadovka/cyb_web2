
import * as React from "react";

const styles = require("./VerticalTabs.less");
import { Link } from 'react-router';

export const Tabs = (props) => (
  <ul
    {...props}
    className={styles.tabs}
  />
)


export const Tab = (props: any) => (
  <li className={styles.tab + ' ' + (props.isActive ? styles.isActive : ' ')}>
    <Link
      {...props}      
    />
  </li>
)
