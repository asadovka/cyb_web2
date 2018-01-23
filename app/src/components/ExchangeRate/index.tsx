import * as React from 'react';

const styles = require("./ExchangeRate.less");


export const ExchangeRate = ({ children }) => (
  <div className={styles.exchangeRate}>
    {children}
  </div>
)

export const ExchangeRateItem = ({ children }) => (
  <div className={styles.exchangeRateItem}>
    {children}
  </div>
)

export const Label = ({ children }) => (
  <span className={styles.label}>
    {children}
  </span>
)

export const Value = ({ children }) => (
  <span className={styles.value}>
    {children}
  </span>
)
