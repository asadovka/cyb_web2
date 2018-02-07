import * as React from "react";

const styles = require("./RoundCheckbox.less");

export const RoundCheckbox = ({ label, color = '', onChange }) => (
  <label className={styles.roundCheckbox + ` ${color ? styles[color] : ''}`} >
    {label}
    <input type='checkbox' onChange={onChange} />
    <span className={styles.checkmark} />
  </label>
)
