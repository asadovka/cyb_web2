import * as React from "react";

import TextField from 'material-ui/TextField';


const Search = ({ search, changeSearch }) => (
  <TextField 
    value={search}
    onChange={(e) => changeSearch(e.target.value)} 
  />
);

import { changeSearch } from './module';
import { connect } from 'react-redux';
export default connect(
  state => ({
    search: state.tokens.search,
  }),
  { changeSearch }
)(Search)
