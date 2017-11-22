import * as React from "react";
const styles = require("./Header.less");


export const Header = ({ children }) => (
  <div className='container'>
    <div className={styles.header}>
      {children}
    </div>
  </div>
);


