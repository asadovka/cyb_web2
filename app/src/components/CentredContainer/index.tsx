import * as React from "react";

const styles = require("./index.less");


const CentredContainer = ({ children }) => (
  <div className={styles.centredContainer}>
    {children}
  </div>
);

export default CentredContainer;
