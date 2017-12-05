import * as React from "react";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";

import { Link } from 'react-router';
var cx = require('classnames');

import { Tabs, Tab } from '../../components/VerticalTabs/';

const LeftMenu = ({
  chains,
  query,
  entities
}) => (
  <Tabs>
      <Tab isActive={!chains} to={{ pathname:"/search", query: { q: query, entities } }}>All</Tab>
      <Tab isActive={chains === 'bitcoin'} to={{ pathname:"/search", query: { q: query, chains: 'bitcoin', entities } }}>Bitcoin</Tab>
      <Tab isActive={chains === 'bitcoin_cash'} to={{ pathname:"/search", query: { q: query, chains: 'bitcoin_cash', entities } }}>Bitcoin cash</Tab>
      <Tab isActive={chains === 'ethereum'} to={{ pathname:"/search", query: { q: query, chains: 'ethereum', entities } }}>Ethereum</Tab>
      <Tab isActive={chains === 'ethereum_classic'} to={{ pathname:"/search", query: { q: query, chains: 'ethereum_classic', entities } }}>Ethereum classic</Tab>
  </Tabs>
)

export default withRouter(connect((state, ownProps) => ({
  query: ownProps.location.query.q,
  chains: ownProps.location.query.chains,
  entities: ownProps.location.query.entities
}))(LeftMenu));
