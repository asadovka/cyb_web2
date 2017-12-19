import * as React from 'react';
import SearchIcon from 'material-ui-icons/Search';
import { browserHistory } from 'react-router'
import { withStyles } from 'material-ui/styles';

import { fade } from 'material-ui/styles/colorManipulator';
const styles = theme => ({
  search: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    font: 'inherit',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme
      .spacing.unit * 9}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    color: 'inherit',
    width: '100%',
    '&:focus': {
      outline: 0,
    },
  },
  wrapper: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    marginRight: 16,
    borderRadius: 2,
    background: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      background: fade(theme.palette.common.white, 0.25),
    },
    '& $input': {
      transition: theme.transitions.create('width'),
      width: 200,
      '&:focus': {
        width: 250,
      },
    },
  },
});

function AppSearch(props) {
  const { classes, width } = props;

  const onSubmit = (e) => {
    e.preventDefault();
    browserHistory.push('/search?q=' + input.value);
  }
  let input;
  return (
    <form onSubmit={onSubmit}>
      <div className={classes.wrapper}>
        <div className={classes.search}>
          <SearchIcon />
        </div>
        <input ref={node => input = node } id="docsearch-input" className={classes.input} />
      </div>
    </form>
  );
}

export default withStyles(styles, { withTheme: true })(AppSearch);
