import * as React from "react";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";

import { Link } from 'react-router';
var cx = require('classnames');

const LeftMenu = ({
  coins,
  query,
  type
}) => (
  <div className='menu'>
    <ul className='menu-list'>                                
      <li>
        <Link className={cx({ 'is-active': !coins })} to={{ pathname:"/search", query: { q: query, type } }}>All</Link>
      </li>
      <li>
        <Link className={cx({ 'is-active': coins === 'blockchain' })} to={{ pathname:"/search", query: { q: query, coins: 'blockchain', type } }}>Blockchain</Link>
      </li>
      <li>
        <Link className={cx({ 'is-active': coins === 'etherium' })} to={{ pathname:"/search", query: { q: query, coins: 'etherium', type } }}>Etherium</Link>
      </li>
    </ul>
  </div>
)

export default withRouter(connect((state, ownProps) => ({
  query: ownProps.location.query.q,
  coins: ownProps.location.query.coins,
  type: ownProps.location.query.type
}))(LeftMenu));
