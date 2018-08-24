import React, { Component } from 'react';
import { Link as LinkRouter} from 'react-router';

const styles = require("./AppsPanel.less");

const Link = (props) => {
  if (/^https?:\/\//.test(props.to)) return <a href={props.to} {...props}/>

  return <LinkRouter {...props} />
};

export const Legend = ({ children }) => (
  <span className={styles.legend}>
    {children}
  </span>
);

export const Items = ({ children }) => (
  <div className={styles.items}>
    {children}
  </div>
);

export const Item = ({ children, to, ...props }) => (
  props.disabled ? (
    <span className={styles.item} {...props}>{children}</span>
    ) : (
    <Link to={to} className={styles.item} {...props}>
    {children}
  </Link>
  )
);

export const Arrow = () => (
  <span className={styles.arrow}/>
);

export const ItemTitle = ({ children, gray }) => (
  <span className={styles.itemTitle + ' ' + (gray ? styles.itemTitleGray : '')}>
    {children}
  </span>
);

export const Image = ({ type }) => (
  <div className={styles.image + ' ' + styles[`image${type}`]}>
  </div>
);