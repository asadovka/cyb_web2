import * as React from "react";

import TextField from 'material-ui/TextField';

import _ from 'lodash';
import CloseIcon from 'material-ui-icons/Close';
import SeacrhIcon from 'material-ui-icons/Search';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  inputInkbar: {
    '&:after': {
      display: 'none'
    },
    '&:before': {
      display: 'none'
    }
  }
});

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: props.search
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
    const { classes } = this.props;

    return (
      <div style={{ position: 'relative' }}>
        <SeacrhIcon style={{ position: 'absolute', left: 0, top: 5 }}/>
        <TextField 
          value={search}
          onChange={(e) => this.changeSearch(e.target.value)} 
          placeholder='Search token...'
          InputProps={{ 
            style: { paddingLeft: 30 }, 
            classes: {
              inkbar: classes.inputInkbar,
            }
          }}

        />
        {/*<CloseIcon onClick={(e) => this.changeSearch('')} style={{ position: 'absolute', right: 5, top: 5 }}/>*/}
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
)(withStyles(styles)(Search))
