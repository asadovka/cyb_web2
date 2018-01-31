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

