import * as React from "react";

const styles = require("./ResultCount.less");

export const Count = (props) => (
  <span
    {...props}
    className={styles.count}
  />
)
