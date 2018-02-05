import * as React from 'react';

const styles = require("./Tabs.less");


const Tabs = ({ children, onChange, value }) => (
  <div className={styles.tab}>
    {React.Children.map(children, child => React.cloneElement(child, { 
      onClick: (e) => onChange(e, child.props.value),
      isActive: child.props.value === value
    }))}
  </div>
)


export const Tab = ({ label, value, onClick, isActive }) => (
  <button onClick={onClick} className={styles.tabs + ' ' + (isActive ? styles.tabsActive : '')}>
    {label}
  </button>
);


export default Tabs;
