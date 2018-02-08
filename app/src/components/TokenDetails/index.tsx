import * as React from 'react';
import Paper from 'material-ui/Paper';


export const LinkList = ({ children }) => (
  <Paper style={{ marginTop: 20, marginBottom: 20, padding: 30, paddingBottom: 10, paddingTop: 10, display: 'flex' }}>
    {children}
  </Paper>
);

export const LinkListItem = ({ name, url }) => (
  <div  style={{ marginRight: 40, fontSize: 14 }}>
    <a style={{ color: '#000'}} target="_blank" href={url}>{name}</a>
  </div>
)

const styles = require("./TokenDetails.less");

export const Label = ({ children }) => (
  <span className={styles.label}>
    {children}
  </span>
)

export const Title = ({ children, color="orange" }) => (
  <h2 className={styles.title + ' ' + styles['title_' + color]}>
    {children}
  </h2>
)

export const Price = ({ children }) => (
  <div className={styles.price} >
    {children}
  </div>
)

export const PriceChange = ({ children }) => (
  <span className={styles.priceChange} >
    {children}
  </span>
);

export const PriceValue = ({ children }) => (
  <span className={styles.priceValue}>
    {children}
  </span>
)


export const CoinLogoContainer = ({ children }) => (
  <div className={styles.coinLogoContainer}>
    {children}
  </div>
);

export const CoinSystem = ({ children }) => (
  <div className={styles.coinSystem}>
    {children}
  </div>
);



export const NewsList = ({ children }) => (
  <ul className={styles.NewsList}>
    {children}
  </ul>
);

export const NewsListLink = ({ children, url, icon }) => (
  <li className={styles.NewsListItem}>
    <a target="_blank" key={url} href={url}>      
      <span className={styles.NewsListItemBg}>      
        {!!icon && <img width={20} src={icon} />}
      </span>
      {children}
    </a>
  </li>
);



export const AppsList = ({ children }) => (
  <ul className={styles.appsList}>
    {children}
  </ul>
);

export const AppsListItem = ({ children, url, icon }) => (
  <li className={styles.appsListItem}>
    <a target="_blank" key={url} href={url}>
      {!!icon && <img width={20} src={icon} />}
      {children}
    </a>
  </li>
);


export const LinkContainer = ({ children }) => (
  <div className={styles.linkContainer}>
    {children}
  </div>
);


export const ScientificRoots = ({ children}) => (
  <ul className={styles.scientificRoots}>
    {children}
  </ul>
);

export const ScientificRootsItem = ({ children, url }) => (
  <li className={styles.scientificRootsItem}>
    <a target="_blank" key={url} href={url}>
      {children}
    </a>
  </li>
);


export const DevelopersDimension = ({ children}) => (
  <ul className={styles.developersDimension}>
    {children}
  </ul>
);

export const DevelopersDimensionItem = ({ children, url }) => (
  <li className={styles.sevelopersDimensionItem}>
    <a target="_blank" key={url} href={url}>
      {children}
    </a>
  </li>
);


export const Tabs = ({ children, onChange, value }) => (
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

