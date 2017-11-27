import * as React from "react";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";

import { Link } from 'react-router';
var cx = require('classnames');

import { Tabs, Tab } from '../../components/VerticalTabs/';

const LeftMenu = ({
  coins,
  query,
  type
}) => (
  <Tabs>
      <Tab isActive={!coins} to={{ pathname:"/search", query: { q: query, type } }}>All</Tab>
      <Tab isActive={coins === 'bitcoin'} to={{ pathname:"/search", query: { q: query, coins: 'bitcoin', type } }}>Bitcoin</Tab>
      <Tab isActive={coins === 'etherium'} to={{ pathname:"/search", query: { q: query, coins: 'etherium', type } }}>Etherium</Tab>
  </Tabs>
)

export default withRouter(connect((state, ownProps) => ({
  query: ownProps.location.query.q,
  coins: ownProps.location.query.coins,
  type: ownProps.location.query.type
}))(LeftMenu));