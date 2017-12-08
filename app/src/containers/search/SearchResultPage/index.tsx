import * as React from "react";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";

import { search } from '../../../modules/search';


import { Link } from 'react-router';

import Content from './Content';
import LeftMenu from './LeftMenu';
import Tabs from './Tabs';
import ResultCount from './ResultCount';
import SearchForm from '../../app/SearchForm';
import App from '../../app/';



class SearchResultPageComponent extends React.Component<any, any> {

  componentDidMount() {
    const { query, page, chains, entities } = this.props;
    this.props.search(query, page, chains, entities);
  }

  componentWillReceiveProps(nextPorps) {
    const { query, page, chains, entities } = this.props;

    if (nextPorps.query !== query || 
        nextPorps.page !== page || 
        nextPorps.chains !== chains || 
        nextPorps.entities !== entities) {
      this.props.search(query, page, chains, entities);    
    }
  }

  render() {
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
    query: ownProps.location.query.q,
    page: ownProps.location.query.page || 0,
    chains: ownProps.location.query.chains,
    entities: ownProps.location.query.entities
  };
}
