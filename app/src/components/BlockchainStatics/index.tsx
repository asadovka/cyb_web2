import * as React from "react";

const styles = require("./index.less");


export const Container = ({ children }) => (
  <div className={styles.container}>
    {children}
  </div>
)

export const Item = ({ children }) => (
  <div className={styles.item}>
    {children}
  </div>
)
