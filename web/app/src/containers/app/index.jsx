
import * as React from 'react';

import {
  Layout,
  AppHeader,
  AppContent,
  AppMenu,
  Menu, MenuItem,
  AppSecondMenu
} from '../../components/AppLayout/';

import withRouter from "react-router/es/withRouter";
import { browserHistory } from 'react-router'


import {
  SearchForm
} from '../../components/SearchForm/'


class PersistentDrawer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: true,
    }
  }


  render() {
    const { menu } = this.props;
    const { open } = this.state;
    const { location: { query : { q } } } = this.props;

    const onSubmit = (value) => {
      browserHistory.push('/search?q=' + value);
    }

    return (
      <Layout
        open={open}
        onToggle={() => this.setState({ open: !this.state.open })}
      >
        <AppHeader>
          <SearchForm onSubmit={onSubmit} defaultValue={q} />
        </AppHeader>
        <AppMenu>
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
        {menu && <AppSecondMenu>
          {menu}
        </AppSecondMenu>}
        <AppContent withMenu={!!menu}>
          {this.props.children}
        </AppContent>        
      </Layout>
    );
  }
}




export default withRouter(PersistentDrawer);

