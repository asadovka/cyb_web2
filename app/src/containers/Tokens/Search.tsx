import * as React from "react";

import TextField from 'material-ui/TextField';

import _ from 'lodash';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }

    this.makeSearch = _.debounce(this.makeSearch.bind(this), 500);
  }

  makeSearch(q) {
    this.props.changeSearch(q)
  }

  changeSearch(search) {
    this.setState({ search });
    this.makeSearch(search);
  }  

  render() {
    const { search } = this.state;

    return (
      <TextField 
          value={search}
          onChange={(e) => this.changeSearch(e.target.value)} 
          placeholder='search token'
        />
    );
  }
}

import { changeSearch } from './module';
import { connect } from 'react-redux';
export default connect(
  state => ({
    search: state.tokens.search,
  }),
  { changeSearch }
)(Search)
