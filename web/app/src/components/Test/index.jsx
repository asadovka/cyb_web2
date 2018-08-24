import * as React from "react";
// import { Link } from 'react-router';

const cx = require('classnames');

const styles = require("./test.less");

export const Panel = ({ open, ...props }) => (
  <div {...props} className={cx(styles.panel, { [styles.panelOpen]: open })} />
);

export const PanelLeft = ({ open, ...props }) => (
  <div {...props} className={styles.panelLeft} />
);

export const PanelRight = ({ open, ...props }) => (
  <div {...props} className={styles.panelRight} />
);


// export const SearchForm = ({ onSubmit, ...props }) => (
//   <form onSubmit={onSubmit} className={styles.searchForm}>
//     <input {...props} className={styles.input} />
//   </form>
// );

export const SearchFormPanel = (props) => (
  <div {...props} className={styles.searchForm}/>
);;




export const LayoutSwitcher = ({ children, open }) => (
  <div className={styles.layoutSwitcher + ' ' + (open ? styles.layoutSwitcherOpen : '')}>
    {children}
  </div>
);

require('./loading.scss');

export const Loading = (props) => (
  <div>
<div className="loader-wrapper">
  <div className="loader">
    <div className="roller"></div>
    <div className="roller"></div>
  </div>
  <div className="loader loader-2">
    <div className="roller"></div>
    <div className="roller"></div>
  </div>
  <div className="loader loader-3">
    <div className="roller"></div>
    <div className="roller"></div>
  </div>
</div>
</div>
);