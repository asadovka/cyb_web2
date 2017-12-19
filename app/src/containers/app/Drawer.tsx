import * as React from 'react';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import { withStyles } from 'material-ui/styles';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Drawer from 'material-ui/Drawer';

const styles = theme => ({
  drawerPaper: {
    width: 200,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

const DrawerComponent = ({ classes, open, handleDrawerClose }) => (
  <Drawer
    type="persistent"
    classes={{
      paper: classes.drawerPaper,
    }}
    anchor={'left'}
    open={open}
  >
    <div className={classes.drawerInner}>
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronRightIcon /> 
        </IconButton>
      </div>
      <Divider />
      <List className={classes.list}>
        <div>
          <ListItem button>
            <Link to='/tokens' style={{ color: '#000', width: '100%' }}>Tokens</Link>
          </ListItem>
          <ListItem button>
            <Link to='/crowdsales' style={{ color: '#000', width: '100%' }}>Crowdsales</Link>
          </ListItem>
          <ListItem button>
            <Link to='/cybernode' style={{ color: '#000', width: '100%' }}>Cybernode</Link>
          </ListItem> 
        </div>
      </List>
    </div>
  </Drawer>
);

export default withStyles(styles, { withTheme: true })(DrawerComponent);
