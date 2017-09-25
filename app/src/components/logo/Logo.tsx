import * as React from "react";

const styles = require("./logo.less");

export function Logo() {
  return (
    <span className={styles.logo}>cyber <span className={styles.dot}>•</span> Fund</span>
  );
}
