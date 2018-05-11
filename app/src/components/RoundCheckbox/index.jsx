import * as React from "react";

const styles = require("./RoundCheckbox.less");

export const RoundCheckbox = ({ label, color = '#438cef', onChange, checked }) => (
  <label className={styles.roundCheckbox + ` ${color ? styles[color] : ''}`} >
    {label}
    <input type='checkbox' onChange={() => onChange(!checked)} checked={checked} />
    <span 
      className={styles.checkmark} 
      style={{
        border: `1px solid ${color}`,
        background: checked ? color : 'none'
      }}
    />
  </label>
)
