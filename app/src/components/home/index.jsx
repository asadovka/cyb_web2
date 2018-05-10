import * as React from 'react';
import { Link as LinkRouter} from 'react-router';

const Link = (props) => {
  if (/^https?:\/\//.test(props.to)) return <a href={props.to} {...props}/>

  return <LinkRouter {...props} />
};

const styles = require("./home.less");

export const Container = ({ children }) => (
  <div className={styles.container}>
    {children}
  </div>
);


export const BGWrapper = ({ children }) => (
  <div style={{   backgroundColor: '#eff3f6', minHeight: '100vh'}}>
    {children}
  </div>
);

export { MetamaskLogo } from './MetamaskLogo';


export const TopPanel = ({ children }) => (
  <div className={styles.topPanel}>
    {children}
  </div>
);

let input;
export const SearchInput = (props) => {
  const onSubmit = (e) => {
    e.preventDefault();
    if (props.onSubmit) props.onSubmit(input.value)
  }
  return (
    <form onSubmit={onSubmit} className={styles.inputContainer}>
      <input 
        {...props} 
        type='text' 
        className={styles.input} 
        ref={node => {
          input = node 
        }} 
      />
      <span className={styles.inputIcone}/>
    </form>
  );
}

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


export const Item = ({ children, to }) => (
  <Link to={to} className={styles.item}>
    {children}
  </Link>
);


export const LinkList = ({ children }) => (
  <nav className={styles.linkList}>
    {children}
  </nav>
);



export const LinkItem = ({ children, to, icon, ...props }) => (
  <Link to={to} className={styles.linkItem + ' ' + styles[`linkItem${icon}`]} {...props}>
    {children}
  </Link>
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
