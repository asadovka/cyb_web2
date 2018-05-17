import * as React from 'react';

const styles = require("./ItemsDetails.less");

import cx from 'classnames';

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

export const Details = ({ children, noShadow = false }) => (
  <table className={cx(styles.details, { [styles.detailsNoShadow] : noShadow })}>
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

export const TLink = ({ hash, to }) => (
  <Link to={to} className={styles.TLink}>
    {hash}
  </Link>
);

export const TransactionsTable = ({ children, page = null, pageSize, totalCount }) => {
  const pages = [];
  for(var i = 0; i < Math.ceil(totalCount/ pageSize); i++) {
    pages.push(<button>{i+1}</button>)
  }
  console.log(totalCount)
  return (
    <div className={styles.transactionsTable}>
      <table>
        {children}
      </table>
      {/*page !== null && <div className={styles.transactionsTablePager}>
        <FlexContainer>
          <div>
            View on page: <select><option>10</option><option>20</option><option>100</option></select>
          </div>
          <div>
            {pages}
          </div>
        </FlexContainer>
      </div>*/}
    </div>
  );
}
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


export const LabelBlock = ({ children }) => (
  <span className={styles.labelBlock}>
    {children}
  </span>
);


export const Grid = ({ children, noPadding = false }) => (
  <div className={styles.grid + ' ' + (noPadding ? styles.gridNoPadding : '')}>
    {children}
  </div>
);

export const Row = ({ children, width, center = false }) => (
  <div className={styles.row} style={{ width, textAlign: center ? 'center': null }}>
    {children}
  </div>
);

export const Paper = ({ children, center, noPadding }) => (
  <div className={cx(styles.paper, { [styles.paperCenter]: center, [styles.paperNoPadding]: noPadding })}>
    {children}
  </div>
);


export const Status = ({ children, type }) => (
  <span className={cx(styles.status, {
    [styles.statusSuccess]: type === 'success',
    [styles.statusWarning]: type === 'warning',
    [styles.statusError]: type === 'error'
  })}>
    {children}
  </span>
);

export const ActionButton = (props) => (
  <div className={styles.actionButton}>
  </div>
);

export const ActionButtonContainer = (props) => (
  <div className={styles.actionButtonContainer}>
    {props.children}
  </div>
);
