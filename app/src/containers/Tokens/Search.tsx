import * as React from "react";

import TextField from 'material-ui/TextField';

import _ from 'lodash';
import CloseIcon from 'material-ui-icons/Close';

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
      <div style={{ position: 'relative' }}>
        <TextField 
          value={search}
          onChange={(e) => this.changeSearch(e.target.value)} 
          placeholder='search token'
          InputProps={{ style: { paddingRight: 30 } }}
        />
        <CloseIcon onClick={(e) => this.changeSearch('')} style={{ position: 'absolute', right: 5, top: 5 }}/>
      </div>
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
