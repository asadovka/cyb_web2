
import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
//import classNames from 'classnames';
const classNames = require('classnames');
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
// import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import IconButton from 'material-ui/IconButton';

import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import Drawer from './Drawer';

import { Link } from 'react-router';
import Tabs, { Tab } from 'material-ui/Tabs';

import Header from './Header';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/createPalette';
import createTypography from 'material-ui/styles/createTypography';

const theme = createMuiTheme({
  typography: createTypography(createPalette({}), {
    fontFamily: '"Play", sans-serif',
  })
});

const styles = theme => ({
  appTitle: {
    flex: 1
  },

  content: {
    width: '100%',
    minHeight: '100vh',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 3 + 86,
    [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing.unit * 3 + 94,
    },
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),

  },
});

import {
  Layout,
  AppHeader,
  AppContent,
  AppMenu,
  SearchForm,
  Logo,
  Menu, MenuItem,
  Switcher
} from '../../components/AppLayout/';


class PersistentDrawer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: true,
    }
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  handleDrawerOpen()  {
    this.setState({ open: true });
  };

  handleDrawerClose() {
    this.setState({ open: false });
  };


  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
        <MuiThemeProvider theme={theme}>
      <Layout>
        <AppHeader open={open}>
          <Logo />
          <SearchForm />
        </AppHeader>
        <AppMenu open={open}>
          <Switcher onClick={() => this.setState({ open: !this.state.open })}/>
          <Menu>
            <MenuItem open={open} icon='stratis' to='/tokens'>Tokens</MenuItem>
            <MenuItem open={open} icon='omi' to='/icos'>ICOs</MenuItem>
            <MenuItem open={open} icon='internet' to='/cybernode'>cybernode</MenuItem>
            <MenuItem open={open} icon='stratis' to='/faq'>FAQ</MenuItem>
          </Menu>
        </AppMenu>
        <AppContent open={open}>
          {this.props.children}
        </AppContent>
      </Layout>
        </MuiThemeProvider>
    );
  }
}




export default withStyles(styles, { withTheme: true })(PersistentDrawer);

