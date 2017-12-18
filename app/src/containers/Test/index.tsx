// import * as React from 'react';
// // import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// // import AppBar from 'material-ui/AppBar';
// // import IconButton from 'material-ui/IconButton';
// import { Link } from 'react-router';

// const Tabs = () => (
//   <div className="tabs is-boxed">
//     <ul>
//       <li className="is-active"><a>All</a></li>
//       <li><a>Blocks</a></li>
//       <li><a>Transaction</a></li>
//       <li><a>Address1</a></li>
//     </ul>
//   </div>
// )


// const Search = () => (
//   <div className='hero'>
//     <div className='hero-body' style={{ paddingBottom: 0 }}>
//     <div className='container'>
//       <div className="field has-addons">
//     <p className="control is-expanded">
//       <input className="input" type="text" placeholder="Find a post" />
//     </p>
//     <p className="control">
//       <button className="button">
//         Search
//       </button>
//     </p>
//     </div>
//     </div>
//     </div>
//   </div>
// )

// const Footer = () => (
//   <footer className="footer is-info">
//     <div className='container'>
//        <div className="columns">
//          <div className="column is-5">
//            <div className='content'>
//              <h2>Cyber fund</h2>
//              <p>Our mission to make digital investments<br /> 
//   comprehensible, accessible, easy and safe.</p>
//            </div>
//          </div>
//          <div className="column is-2">
//            <div className='content'>
//                <h3>Build</h3>
//            </div>
//          </div>
//          <div className="column is-2">
//            <div className='content'>
//                <h3>Projects</h3>
//                <ul>
//                 <li><a href='/'>Satoshi•Fund</a></li>
//                 <li><a href='/'>Satoshi•Pie</a></li>
//               </ul>
//            </div>
//          </div>
//           <div className="column is-3">
//            <div className='content'>
//                <h3>Follow</h3>
//            </div>
//          </div>
//        </div>
//     </div>
//   </footer>
// );

// const Nav = () => (
//   <nav className="navbar is-info" role="navigation" aria-label="dropdown navigation">
//     <div className='container'>
//       <div className='navbar-brand'>
//         <a className='navbar-item' href='/'>
//           <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
//         </a>
//       </div>
//       <div className='navbar-end'>
//         <Link activeClassName='is-active' className='navbar-item' to='/tokens'>Tokens</Link>
//         <Link activeClassName='is-active' className='navbar-item' to='/funds'>Funds</Link>
//         <Link activeClassName='is-active' className='navbar-item' to='/crowdsales'>Crowdsales</Link>
//         <Link activeClassName='is-active' className='navbar-item' to='/blockchains'>Blockchains</Link>
//         <Link activeClassName='is-active' className='navbar-item' to='/analytics'>Analytics</Link>
//         <Link activeClassName='is-active' className='navbar-item' to='/cybernode'>Cybernode</Link>
//       </div>
//     </div>
//   </nav>
// );

// const Menu = () => (
//   <aside className="menu">
//     <ul className="menu-list">
//       <li ><a className='is-active'>All</a></li>
//       <li><a>Bitcoin</a></li>
//       <li><a>Bitcoin cash</a></li>
//       <li><a>Ethereum</a></li>
//       <li><a>Ethereum classic</a></li>
//     </ul>
//   </aside>
// );

// const Test = () => {
//   return (
//     <div>
//         <div>
//         <Nav />

//         <Search />

//         <section className="section">
//           <div className='container'>
//             <div className='columns'>
//               <div className='column is-narrow'>
//                 <Menu />
//               </div>
//               <div className='column'>
//                 <Tabs />
//                 <div className='columns is-multiline'>
//                   <div className='column is-4'>
//                     <div className='box'>
//                       <div className='content'>
//                         <h3>Bitcoint </h3>
//                       </div>
//                     </div>
//                   </div>
//                   <div className='column is-4 '>
//                     <div className='box'>1</div>
//                   </div>
//                   <div className='column is-4'>
//                     <div className='box'>1</div>
//                   </div>
//                   <div className='column is-4'>
//                     <div className='box'>1</div>
//                   </div>
//                   <div className='column is-4'>
//                     <div className='box'>1</div>
//                   </div>

//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <Footer />
        
//         </div>
//     </div>
//   )
// }

// export default Test;

// import * as React from 'react';
// import AppBar from 'material-ui/AppBar';
// import { withStyles } from 'material-ui/styles';
// import Drawer from 'material-ui/Drawer';
// import Toolbar from 'material-ui/Toolbar';
// import List from 'material-ui/List';
// import Typography from 'material-ui/Typography';
// import IconButton from 'material-ui/IconButton';
// import Hidden from 'material-ui/Hidden';
// import Divider from 'material-ui/Divider';
// import MenuIcon from 'material-ui-icons/Menu';

// const styles = theme => ({
//   root: {

//   },

//   appFrame: {
//   },

//   content: {

//   },

//   drawerPaper: {

//   }
// })

// class Test extends React.Component<any, any> {
//   constructor(props) {
//     super(props);
//     this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
//   }
//   handleDrawerToggle() {

//   }
//   render() {
//     const {
//       classes
//     } = this.props;

//     const drawer = (
//       <div>
//         <div className={classes.drawerHeader} />
//         <Divider />
//         <List>mailFolderListItems</List>
//         <Divider />
//         <List>otherMailFolderListItems</List>
//       </div>
//     );

//     return (
//       <div className={classes.root}>
//   <div className={classes.appFrame}>
//       <AppBar>
//         <Toolbar>
//           <IconButton
//             color="contrast"
//             aria-label="open drawer"
//             onClick={this.handleDrawerToggle}
//             className={classes.navIconHide}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography type="title" color="inherit" noWrap>
//             Responsive drawer
//           </Typography>
//         </Toolbar>
//       </AppBar>
//           <Hidden mdDown implementation="css">
//             <Drawer
//               type="permanent"
//               open
//               classes={{
//                 paper: classes.drawerPaper,
//               }}
//             >
//               {drawer}
//             </Drawer>
//           </Hidden>
//       <main className={classes.content}>
//         <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
//       </main>
//   </div>
//   </div>
//     );
//   }
// }

// export default withStyles(styles, { withTheme: true })(Test);



import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
//import classNames from 'classnames';
const classNames = require('classnames');
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';


import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

//import { mailFolderListItems, otherMailFolderListItems } from './tileData';

// const mailFolderListItems = 'mailFolderListItems';
// const otherMailFolderListItems = ' otherMailFolderListItem';

import { Link } from 'react-router';

const mailFolderListItems = (
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
);

const otherMailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <MailIcon />
      </ListItemIcon>
      <ListItemText primary="All mail" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Trash" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="Spam" />
    </ListItem>
  </div>
);
import { fade } from 'material-ui/styles/colorManipulator';

const drawerWidth = 240;

const styles = theme => ({
  // root: {
  //   width: '100%',
  //   height: 430,
  //   // marginTop: theme.spacing.unit * 3,
  //   zIndex: 1,
  //   overflow: 'hidden' as any,
  // },
  // appFrame: {
  //   position: 'relative' as any,
  //   display: 'flex',
  //   width: '100%',
  //   height: '100%',
  // },
  // appBar: {
  //   position: 'absolute' as any,
  //   transition: theme.transitions.create(['margin', 'width'], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  // },
  // appBarShift: {
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   transition: theme.transitions.create(['margin', 'width'], {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  // 'appBarShift-left': {
  //   marginLeft: drawerWidth,
  // },
  // 'appBarShift-right': {
  //   marginRight: drawerWidth,
  // },
  // menuButton: {
  //   marginLeft: 12,
  //   marginRight: 20,
  // },
  // hide: {
  //   display: 'none',
  // },
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

  appTitle: {
    flex: 1
  },

  content: {
    width: '100%',
    minHeight: '100vh',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 3 + 56,
    [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing.unit * 3 + 64,
    },
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),


    // height: 'calc(100% - 56px)',
    // marginTop: 56,
    // [theme.breakpoints.up('sm')]: {
    //   height: 'calc(100% - 64px)',
    //   marginTop: 64,
    // },
  },
  // 'content-left': {
  //   marginLeft: -drawerWidth,
  // },
  // 'content-right': {
  //   marginRight: -drawerWidth,
  // },
  // contentShift: {
  //   transition: theme.transitions.create('margin', {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  // 'contentShift-left': {
  //   marginLeft: 0,
  // },
  // 'contentShift-right': {
  //   marginRight: 0,
  // },

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
});
import SearchIcon from 'material-ui-icons/Search';
import { browserHistory } from 'react-router'

function AppSearch(props) {
  const { classes, width } = props;

  // if (!isWidthUp('sm', width)) {
  //   removeDocsearch();
  //   return null;
  // }

//  initDocsearch();

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

const AppSearchComponent = withStyles(styles, { withTheme: true })(AppSearch);

class PersistentDrawer extends React.Component<any, any> {
  constructor(props){
    super(props);
    this.state = {
      open: false,
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

    const anchor = 'left';

    const drawer = (
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
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronRightIcon /> 
            </IconButton>
          </div>
          <Divider />
          <List className={classes.list}>{mailFolderListItems}</List>
        </div>
      </Drawer>
    );

//     const data = [
//       {
//         id: 1,
//         name: 'name',
//         calories: 'calories',
//         fat: 'fat',
//         carbs: 'carbs',
//         protein: 'protein'
//       },
//       {
//         id: 2,
//         name: 'name',
//         calories: 'calories',
//         fat: 'fat',
//         carbs: 'carbs',
//         protein: 'protein'
//       }
//     ];

// <Paper>
//               test
//             </Paper>
//             <Typography>{'You think water moves fast? You should see ice.'}</Typography>

//             <Table className={classes.table}>
//         <TableHead>
//           <TableRow>
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell numeric>Calories</TableCell>
//             <TableCell numeric>Fat (g)</TableCell>
//             <TableCell numeric>Carbs (g)</TableCell>
//             <TableCell numeric>Protein (g)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map(n => {
//             return (
//               <TableRow key={n.id}>
//                 <TableCell>{n.name}</TableCell>
//                 <TableCell numeric>{n.calories}</TableCell>
//                 <TableCell numeric>{n.fat}</TableCell>
//                 <TableCell numeric>{n.carbs}</TableCell>
//                 <TableCell numeric>{n.protein}</TableCell>
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       </Table>

    return (
      <div>
        <AppBar>
            <Toolbar >
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton)}
              >
                <MenuIcon />
              </IconButton>
              <Typography className={classes.appTitle} type="title" color="inherit" noWrap>
                <Link to='/' style={{ color: '#fff'}}>Cyber search</Link>
              </Typography>
              <div>
                <AppSearchComponent />
              </div>
            </Toolbar>
        </AppBar>
        {drawer}
        <main className={classes.content}>
          <div className='container'>
            {this.props.children}
          </div>
        </main>
      </div>
    );

    // return (
      // <div className={classes.root}>
      //   <div className={classes.appFrame}>
      //     <AppBar
      //       className={classNames(classes.appBar, {
      //         [classes.appBarShift]: open,
      //         [classes[`appBarShift-${anchor}`]]: open,
      //       })}
      //     >
      //       <Toolbar disableGutters={!open}>
      //         <IconButton
      //           color="contrast"
      //           aria-label="open drawer"
      //           onClick={this.handleDrawerOpen}
      //           className={classNames(classes.menuButton, open && classes.hide)}
      //         >
      //           <MenuIcon />
      //         </IconButton>
      //         <Typography type="title" color="inherit" noWrap>
      //           Persistent drawer
      //         </Typography>
      //       </Toolbar>
      //     </AppBar>
      //     {drawer}
      //     <main
      //       className={classNames(classes.content, classes[`content-${anchor}`], {
      //         [classes.contentShift]: open,
      //         [classes[`contentShift-${anchor}`]]: open,
      //       })}
      //     >
      //       <Typography>{'You think water moves fast? You should see ice.'}</Typography>
      //     </main>

      //   </div>
      // </div>
    // );
  }
}

// PersistentDrawer.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };

// export default withStyles(styles, { withTheme: true })(PersistentDrawer);


const Test = () => {
  return (
    <div>
      test
    </div>
  );
}



export const App = withStyles(styles, { withTheme: true })(PersistentDrawer);

