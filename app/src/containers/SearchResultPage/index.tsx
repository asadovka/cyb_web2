import * as React from "react";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";

import { search } from '../../modules/search';


import { Link } from 'react-router';

import Content from './Content';
import LeftMenu from './LeftMenu';
import Tabs from './Tabs';
import ResultCount from './ResultCount';
import SearchForm from '../app/SearchForm';
import App from '../app/';



class SearchResultPageComponent extends React.Component {

  componentDidMount() {
    const { query, page, coins, type } = this.props;

    this.props.search(query, page, coins, type);
  }

  componentWillReceiveProps(nextPorps) {
    const { query, page, coins, type } = this.props;

    if (nextPorps.query !== query || 
        nextPorps.page !== page || 
        nextPorps.coins !== coins || 
        nextPorps.type !== type) {
      this.props.search(query, page, coins, type);    
    }
  }

  render() {
    const {searchResult, query, page, coins, type } = this.props;
    
    return (
      <App>
        <SearchForm />
        <Tabs />
        <ResultCount />
        <div className='columns'>
          <div className='column is-narrow'>    
            <LeftMenu />
          </div>
          <div className='column'>
             <Content />
          </div>
        </div>
      </App>
    );
  }
}



export const SearchResultPage = withRouter(connect(mapStateToProps, { search })(SearchResultPageComponent));

function mapStateToProps(state, ownProps) {
  return {
    searchResult: state.search,
    query: ownProps.location.query.q,
    page: ownProps.location.query.page || 0,
    coins: ownProps.location.query.coins,
    type: ownProps.location.query.type
  };
}

