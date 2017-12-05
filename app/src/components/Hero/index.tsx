import * as React from "react";

const styles = require("./Hero.less");



export const Title = ({ children }) => (
  <h2 className={styles.title}>{children}</h2>
);

export const BigLogo = () => (
  <span className={styles.bigLogo}>cyber<span>•</span>Fund</span>
);
