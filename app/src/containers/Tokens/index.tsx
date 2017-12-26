import * as React from "react";


var config = require('./config.js')


import { connect } from 'react-redux';
import { showAllTokens, closeConnection, } from './module';

import ExchangeRate from './ExchangeRate';
import TokensTable from './TokensTable';


class TokensPages extends React.Component {

  componentWillUnmount() {
    this.props.closeConnection();
  }

  componentDidMount() {
    this.props.showAllTokens(); 
  }

  render() {
    return (
      <div>
        <ExchangeRate />
        <TokensTable />
      </div>
    );    
  }
}

import _ from 'lodash';

export default connect(
  null,
  { showAllTokens, closeConnection }
)(TokensPages);
