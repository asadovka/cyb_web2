import * as React from "react";

const styles = require("./RoundCheckbox.less");

export const RoundCheckbox = ({ label, color = '#000', onChange, checked }) => (
  <label className={styles.roundCheckbox + ` ${color ? styles[color] : ''}`} style={{ color: color }}>
    {label}
    <input type='checkbox' onChange={onChange} checked={checked} />
    <span 
      className={styles.checkmark} 
      style={{
        border: `1px solid ${color}`,
        background: checked ? color : 'none'
      }}
    />
  </label>
)
