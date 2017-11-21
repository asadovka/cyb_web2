import * as React from "react";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";

import { Link } from 'react-router';
var cx = require('classnames');

const Tabs = ({ type, query, coins }) => (
  <div className='tabs'>   
    <ul>                                 
      <li className={!type ? 'is-active' : ''}>
        <Link  to={{ pathname:"/search", query: { q: query, coins } }}>All</Link>
      </li>
      <li className={cx({ 'is-active': type === 'blocks' })}>
        <Link  to={{ pathname:"/search", query: { q: query, coins, type: "blocks" } }}>Blocks</Link>
      </li>
      <li className={cx({ 'is-active': type === 'transactions' })}>
        <Link  to={{ pathname:"/search", query: { q: query, coins, type: "transactions" } }}>Transactions</Link>
      </li>
      <li className={cx({ 'is-active': type === 'address' })}>
        <Link  to={{ pathname:"/search", query: { q: query, coins, type: "address" } }}>Address</Link>
      </li>
    </ul>
  </div>
);

export default withRouter(connect((state, ownProps) => ({
  query: ownProps.location.query.q,
  coins: ownProps.location.query.coins,
  type: ownProps.location.query.type
}))(Tabs));
