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
    <div className={styles.transactionsTablePager}>
      <FlexContainer>
        <div>
          View on page: <select><option>10</option><option>20</option><option>100</option></select>
        </div>
        <div>
          <button>previous</button>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <span>...</span>
          <button>12</button>
          <button>next</button>
        </div>
      </FlexContainer>
    </div>
  </div>
);
var numeral = require('numeral');

export const EPrice = ({ value, icon = false }) => (
  <span>
    {icon && <img className={styles.paperIcon} src={require('./paper.svg')}/>}
    {numeral(value).format('0.000000')} ETH
  </span>
)

//TODO: better name
export const FlexContainer = ({ children }) => (
  <div className={styles.flexContainer}>
    {children}
  </div>
);

