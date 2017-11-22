import * as React from "react";

const styles = require("./AppContainer.less");


export const AppContainer = ({ children }) => (
  <div className='container'>
    <div className={styles.appContainer}>
      {children}
    </div>
  </div>
);
