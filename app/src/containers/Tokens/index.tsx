import * as React from "react";


var config = require('./config.js')


import { connect } from 'react-redux';
import { showAllTokens, closeConnection, } from './module';

import ExchangeRate from './ExchangeRate';
import TokensTable from './TokensTable';

import { CircularProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';
import Search from './Search';

class TokensPages extends React.Component {

  componentWillUnmount() {
    this.props.closeConnection();
  }

  componentDidMount() {
    this.props.showAllTokens(); 
  }

  render() {
    const { loading } = this.props;

    if (loading) {
      return (
        <div style={{ textAlign: 'center', marginTop: 100 }}>
          <CircularProgress  size={50} />
        </div>
      );
    }

    return (
      <div>
        <div style={{ display: 'flex', paddingBottom: 10}}>
          <Search/>
          <ExchangeRate />
        </div>
        <TokensTable />
      </div>
    );    
  }
}

import _ from 'lodash';

export default connect(
  state => ({
    loading: state.tokens.loading
  }),
  { showAllTokens, closeConnection }
)(TokensPages);
