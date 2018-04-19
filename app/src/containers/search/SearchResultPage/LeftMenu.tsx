import * as React from "react";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";

import { Link } from 'react-router';
var cx = require('classnames');

// import { Tabs, Tab } from '../../../components/VerticalTabs/';

// const LeftMenu = ({
//   chains,
//   query,
//   entities
// }) => (
//   <Tabs>
//       <Tab isActive={!chains} to={{ pathname:"/search", query: { q: query, entities } }}>All</Tab>
//       <Tab isActive={chains === 'bitcoin'} to={{ pathname:"/search", query: { q: query, chains: 'bitcoin', entities } }}>Bitcoin</Tab>
//       <Tab isActive={chains === 'bitcoin_cash'} to={{ pathname:"/search", query: { q: query, chains: 'bitcoin_cash', entities } }}>Bitcoin cash</Tab>
//       <Tab isActive={chains === 'ethereum'} to={{ pathname:"/search", query: { q: query, chains: 'ethereum', entities } }}>Ethereum</Tab>
//       <Tab isActive={chains === 'ethereum_classic'} to={{ pathname:"/search", query: { q: query, chains: 'ethereum_classic', entities } }}>Ethereum classic</Tab>
//   </Tabs>
// )

import List from 'material-ui/List';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import { FilterPanel } from '../../../components/searchPage/'

import { RoundCheckbox } from '../../../components/RoundCheckbox/'

import { browserHistory } from 'react-router'

import { colors } from '../../../components/SearchItems/';

class LeftMenu extends React.Component {
  
  constructor(props) {
    super(props);
  }

  change(chain) {
    const {
      query,
      chains,
      entities
    } = this.props;
    let newChains = chains || '';
    
    newChains = newChains.indexOf(chain) === -1  
      ? newChains.split(',').concat(chain)
      : newChains.split(',').filter(x => x !== chain)

    const _newChains = newChains.filter(x => !!x).join(',');
    this.props.router.push({ pathname: '/search', query: { q: query, chains: _newChains, entities} });
    // browserHistory.push('/search', { q: query, chains: chain, entities })
  }

  render() {
    // const {
    //   chains
    // } = this.prop;

    return (
      <FilterPanel>
        <h2>Show results for:</h2>

        <h3 style={{ marginTop: 50 }}>Blockchain</h3>
        <ul>
          <li style={{ marginBottom: 10 }}>
            <RoundCheckbox  checked={true} label='Ethereum' color={colors.ethereum} />
          </li>
          {/*<li style={{ marginBottom: 10 }}>
            <RoundCheckbox onChange={() => this.change('bitcoin')} label='Bitcoin' color='#7780fc' />
          </li>
          <li style={{ marginBottom: 10 }}>
            <RoundCheckbox onChange={() => this.change('bitcoin_cash')} label='Bitcoin cash' color='#74c1ff'/>
          </li>
          <li style={{ marginBottom: 10 }}>
            <RoundCheckbox onChange={() => this.change('ethereum_classic')} label='Ethereum classic' color='#38d2b6'/>
          </li>*/}
        </ul>

        <h3 style={{ marginTop: 50 }}>Object</h3>
        <ul >
          <li style={{ marginBottom: 10 }}>
            <RoundCheckbox  checked={true} label='Contract' color={colors.contract} />
          </li>
          <li style={{ marginBottom: 10 }}>
            <RoundCheckbox  checked={true} label='Block' color={colors.block} />
          </li>
          <li style={{ marginBottom: 10 }}>
            <RoundCheckbox  checked={true} label='Uncle block' color={colors.uncle} />
          </li>
          <li style={{ marginBottom: 10 }}>
            <RoundCheckbox  checked={true} label='Transaction' color={colors.transaction} />
          </li>
        </ul>
      </FilterPanel>
    );
  }
}

// const LeftMenu = ({
//   chains,
//   query,
//   entities
// }) => (
// <List >
//     <ListItem button>
//       <Link to={{ pathname:"/search", query: { q: query, entities } }} style={{ color: '#000', width: '100%' }}>All</Link>
//     </ListItem>
//     <Divider />
//     <ListItem button>
//       <Link to={{ pathname:"/search", query: { q: query, chains: 'bitcoin', entities } }} style={{ color: '#000', width: '100%' }}>Bitcoin</Link>
//     </ListItem>
//     <Divider />
//     <ListItem button>
//       <Link to={{ pathname:"/search", query: { q: query, chains: 'bitcoin_cash', entities } }} style={{ color: '#000', width: '100%' }}>Bitcoin cash</Link>
//     </ListItem>
//     <Divider />
//     <ListItem button>
//       <Link to={{ pathname:"/search", query: { q: query, chains: 'ethereum', entities } }} style={{ color: '#000', width: '100%' }}>Ethereum</Link>
//     </ListItem>
//     <Divider />
//     <ListItem button>
//       <Link to={{ pathname:"/search", query: { q: query, chains: 'ethereum_classic', entities } }} style={{ color: '#000', width: '100%' }}>Ethereum classic</Link>
//     </ListItem>
//   </List>
// )

export default withRouter(connect((state, ownProps) => ({
  query: ownProps.location.query.q,
  chains: ownProps.location.query.chains,
  entities: ownProps.location.query.entities
}))(LeftMenu));
