import * as React from "react";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";

import { Link } from 'react-router';
var cx = require('classnames');

import { Tabs, Tab } from '../../components/HorizontTabs/';

const TabsContainer = ({ type, query, coins }) => (
  <Tabs>   
    <Tab
      isActive={!type}
      to={{ pathname:"/search", query: { q: query, coins } }}
    >All</Tab>
    <Tab
      isActive={type === 'blocks'}
      to={{ pathname:"/search", query: { q: query, coins, type: "blocks" } }}
    >Blocks</Tab>
    <Tab
      isActive={type === 'transactions'}
      to={{ pathname:"/search", query: { q: query, coins, type: "transactions" } }}
    >Transactions</Tab>
    <Tab
      isActive={type === 'address'}
      to={{ pathname:"/search", query: { q: query, coins, type: "address" } }}
    >Address</Tab>
  </Tabs>
);

export default withRouter(connect((state, ownProps) => ({
  query: ownProps.location.query.q,
  coins: ownProps.location.query.coins,
  type: ownProps.location.query.type
}))(TabsContainer));
