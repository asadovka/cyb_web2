import * as React from "react";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";



import { Title, List } from '../../../components/searchPage/'

import { RoundCheckbox } from '../../../components/RoundCheckbox/'


import { colors } from '../../../components/SearchItems/';

class LeftMenu extends React.Component {
  changeChain(chain) {
    const {
      query,
      chains,
      types
    } = this.props;
    let newChains = chains || '';
    
    newChains = newChains.split(',').indexOf(chain) === -1  
      ? newChains.split(',').concat(chain)
      : newChains.split(',').filter(x => x !== chain)


    const _newChains = newChains.filter(x => !!x).join(',');
    this.props.router.push({ pathname: '/search', query: { q: query, chains: _newChains, types: types } });
    // browserHistory.push('/search', { q: query, chains: chain, entities })
  }
  selectAllChain = (checked) => {
    const {
      query,
      chains,
      types
    } = this.props;
    let newChains = chains || '';
    
    newChains = checked ? ['ethereum', 'ethereum_classic'] : [];


    const _newChains = newChains.filter(x => !!x).join(',');
    this.props.router.push({ pathname: '/search', query: { q: query, chains: _newChains, types: types } });
  }
  selectAllTypes = (checked) => {
    const {
      query,
      chains,
      types
    } = this.props;
    let newTypes = types || '';
    
    newTypes = checked ? ['contract_summary', 'block', 'uncle', 'tx'] : [];


    const _newTypes = newTypes.filter(x => !!x).join(',');
    this.props.router.push({ pathname: '/search', query: { q: query, chains: chains, types: _newTypes } });

  }
  changeTypes(type) {
    const {
      query,
      chains,
      types
    } = this.props;
    let newTypes = types || '';
    
    newTypes = newTypes.split(',').indexOf(type) === -1  
      ? newTypes.split(',').concat(type)
      : newTypes.split(',').filter(x => x !== type)


    const _newTypes = newTypes.filter(x => !!x).join(',');
    this.props.router.push({ pathname: '/search', query: { q: query, chains: chains, types: _newTypes } });
  }
  isAllChainSelected(chains) {
    //TODO:
    return !!chains.split(',').find(x => x === 'ethereum') && !!chains.split(',').find(x => x === 'ethereum_classic');
  }
  isAllTypesSelected(types) {
    return !!types.split(',').find(x => x === 'contract_summary') &&
      !!types.split(',').find(x => x === 'block') && 
      !!types.split(',').find(x => x === 'uncle') && 
      !!types.split(',').find(x => x === 'tx');
  }
  render() {
    let {
      chains,
      types
    } = this.props;

    chains = chains || '';
    types = types || '';

    return (
      <div>
        <Title>Show results for:</Title>

        <RoundCheckbox 
          onChange={this.selectAllChain}
          checked={this.isAllChainSelected(chains)} 
          label='Blockchain'  
        />
        <List>
          <li>
            <RoundCheckbox 
              onChange={() => this.changeChain('ethereum')} 
              checked={!!chains.split(',').find(x => x === 'ethereum')} 
              label='Ethereum' color={colors.ethereum} />
          </li>
          <li>
            <RoundCheckbox 
              onChange={() => this.changeChain('ethereum_classic')} 
              checked={!!chains.split(',').find(x => x === 'ethereum_classic')} 
              label='Ethereum Classic' 
              color={colors.ethereum_classic} />
          </li>
        </List>

        <RoundCheckbox 
          onChange={this.selectAllTypes}
          checked={this.isAllTypesSelected(types)} 
          label='Object'  
        />        
        <List>
          <li>
            <RoundCheckbox  
              onChange={() => this.changeTypes('contract_summary')} 
              checked={!!types.split(',').find(x => x === 'contract_summary')}  
              label='Contract' color={colors.contract} />
          </li>
          <li>
            <RoundCheckbox  
              onChange={() => this.changeTypes('block')} 
              checked={!!types.split(',').find(x => x === 'block')} 
              label='Block' color={colors.block} />
          </li>
          <li>
            <RoundCheckbox  
              onChange={() => this.changeTypes('uncle')} 
              checked={!!types.split(',').find(x => x === 'uncle')} 
              label='Uncle block' 
              color={colors.uncle} />
          </li>
          <li>
            <RoundCheckbox  
              onChange={() => this.changeTypes('tx')} 
              checked={!!types.split(',').find(x => x === 'tx')}
              label='Transaction' color={colors.transaction} />
          </li>
        </List>
      </div>
    );
  }
}
export default withRouter(connect((state, ownProps) => ({
  query: ownProps.location.query.q,
  chains: ownProps.location.query.chains,
  types: ownProps.location.query.types
}))(LeftMenu));
