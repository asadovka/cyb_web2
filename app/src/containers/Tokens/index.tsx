import * as React from "react";


var config = require('./config.js')


import { connect } from 'react-redux';
import { showAllTokens, closeConnection, } from './module';

import ExchangeRate from './ExchangeRate';
import TokensTable from './TokensTable';

import { CircularProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';
import Search from './Search';
import Paper from 'material-ui/Paper';

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
        <Paper style={{ padding: '15px 25px', marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <Search/>
          <ExchangeRate />
        </div>
        </Paper>
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
