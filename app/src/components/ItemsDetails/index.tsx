import * as React from 'react';

const styles = require("./ItemsDetails.less");

export const Head = ({ children }) => (
  <div className={styles.head}>
    {children}
  </div>
);

export const SubTitle = ({ children }) => (
  <h3 className={styles.subTitle}>{children}</h3>
);

export const Button = (props) => (
  <button {...props} className={styles.button}/>
);

export const Details = ({ children }) => (
  <table className={styles.details}>
    <tbody>
      {children}
    </tbody>
  </table>
);

export const DetailsRow = ({ children }) => (
  <tr>
    {children}
  </tr>
);


export const Label = ({ children }) => (
  <td className={styles.label}>
    {children}:
  </td>
)

export const Value = ({ children }) => (
  <td className={styles.value}>
    {children}
  </td>
);

import { Link } from 'react-router'; 

export const TLink = ({ hash }) => (
  <Link to={`/ethereum/tx/${hash}`} className={styles.TLink}>
    {hash}
  </Link>
);

export const TransactionsTable = ({ children }) => (
  <div className={styles.transactionsTable}>
    <table>
      {children}
    </table>
  </div>
);

