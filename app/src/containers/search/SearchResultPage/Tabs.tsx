import * as React from "react";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";

import { Link } from 'react-router';
var cx = require('classnames');
import Tabs, { Tab } from '../../../components/Tabs/'
//'material-ui/Tabs';

import { browserHistory } from 'react-router'

const TabsContainer = ({ entities, query, chains }) => {
  let tabIndex = 0;

  if (entities === 'BLOCK') tabIndex = 1;
  if (entities === 'TRANSACTION') tabIndex = 2;

  const tabChange = (event, value) => {
    let newEntities = 'TRANSACTION';
    let url = `/search?q=${query}`;
    if (chains) {
      url += `&chains=${chains}`;
    }
    if (value === 1) {
      url += '&entities=BLOCK';        
    }
    if (value === 2) {
      url += '&entities=TRANSACTION';        
    }
    browserHistory.push(url);
  }
  return (
    <Tabs
      value={tabIndex}
      onChange={tabChange}
    >
      <Tab label="All" value={0}/>
      <Tab label="Blocks" value={1}/>
      <Tab label="Transactions" value={2}/>
    </Tabs>
  );
}

export default withRouter(connect((state, ownProps) => ({
  query: ownProps.location.query.q,
  chains: ownProps.location.query.chains,
  entities: ownProps.location.query.entities
}))(TabsContainer));
