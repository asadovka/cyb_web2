import * as React from "react";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";

import { Link } from 'react-router';
var cx = require('classnames');

import { Tabs, Tab } from '../../../components/HorizontTabs/';

const TabsContainer = ({ entities, query, coins }) => (
  <Tabs>   
    <Tab
      isActive={!entities}
      to={{ pathname:"/search", query: { q: query, coins } }}
    >All</Tab>
    <Tab
      isActive={entities === 'BLOCK'}
      to={{ pathname:"/search", query: { q: query, coins, entities: "BLOCK" } }}
    >Blocks</Tab>
    <Tab
      isActive={entities === 'TRANSACTION'}
      to={{ pathname:"/search", query: { q: query, coins, entities: "TRANSACTION" } }}
    >Transactions</Tab>
    <Tab
      isActive={entities === 'ADDRESS'}
      to={{ pathname:"/search", query: { q: query, coins, entities: "ADDRESS" } }}
    >Address</Tab>
  </Tabs>
);

export default withRouter(connect((state, ownProps) => ({
  query: ownProps.location.query.q,
  coins: ownProps.location.query.coins,
  entities: ownProps.location.query.entities
}))(TabsContainer));
