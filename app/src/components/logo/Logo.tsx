import * as React from "react";
import {Link} from "react-router";

const styles = require("./logo.less");

export function Logo() {
  return (
    <span className={styles.logo}>
      <Link to={"/"}>
        <img src={require('./logo_search.svg')}/>
      </Link>
    </span>
  );
}
