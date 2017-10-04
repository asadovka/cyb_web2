import * as React from "react";
import {Link} from "react-router";

const styles = require("./logo.less");

export function Logo() {
  return (
    <span className={styles.logo}>
      <Link to={"/"}>
        cyber <span className={styles.dot}>•</span> Fund
      </Link>
    </span>
  );
}
