
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


import { Link } from 'react-router';
import Tabs, { Tab } from 'material-ui/Tabs';


import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/createPalette';
import createTypography from 'material-ui/styles/createTypography';

const theme = createMuiTheme({
  typography: createTypography(createPalette({}), {
    fontFamily: '"Play", sans-serif',
  })
});

const styles = theme => ({});

import {
  Layout,
  AppHeader,
  AppContent,
  AppMenu,
  SearchForm,
  Logo,
  Menu, MenuItem,
  Switcher,
  LayoutSwitcher
} from '../../components/AppLayout/';


class PersistentDrawer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: true,
    }
  }


  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
        <MuiThemeProvider theme={theme}>
      <Layout>
        <LayoutSwitcher open={open}>
          <Switcher open={open} onClick={() => this.setState({ open: !this.state.open })}/>
        </LayoutSwitcher>
        <AppHeader open={open}>
          <Logo />
          <SearchForm />
        </AppHeader>
        <AppMenu open={open}>
          <Menu open={open} >
            <MenuItem icon='stratis' to='/tokens'>Tokens</MenuItem>
            <MenuItem icon='mail' to='/contracts'>Contracts</MenuItem>
            <MenuItem icon='internet' to='/labels'>Labels</MenuItem>
            <MenuItem icon='omi' to='/icos'>ICOs</MenuItem>
            <MenuItem icon='hitbox' to='/registers'>Blockchains</MenuItem>
            <MenuItem icon='refresh' to='/exchanges'>Exchanges</MenuItem>
            <MenuItem icon='chart' to='/analytics'>Analytics</MenuItem>
            <MenuItem icon='square-qube' to='/cybernode'>cybernode</MenuItem>
            <MenuItem icon='help' to='/faq'>FAQ</MenuItem>
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

