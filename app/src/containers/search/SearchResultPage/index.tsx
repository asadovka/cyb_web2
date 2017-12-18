import * as React from "react";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";

import { search } from '../../../modules/search';


import { Link } from 'react-router';

import Content from './Content';
import LeftMenu from './LeftMenu';
// import Tabs from './Tabs';
import ResultCount from './ResultCount';
import SearchForm from '../../app/SearchForm';
import App from '../../app/';

import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

import { browserHistory } from 'react-router'

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
    const {
      query,
      entities,
      chains,
    } = this.props;

    let tabIndex = 0;

    if (entities === 'BLOCK') tabIndex = 1;
    if (entities === 'TRANSACTION') tabIndex = 2;

    const tabChange = (event, value) => {
      let newEntities = 'TRANSACTION';
      let url = `/search?q=${query}`;
      if (chains) {
        url += `&chains=${chains}`;
      }
      if (value === 1) {
        url += '&entities=BLOCK';        
      }
      if (value === 2) {
        url += '&entities=TRANSACTION';        
      }
      browserHistory.push(url);
    }

    return (
      <div>
        {/*<SearchForm />*/}
        {/*<Tabs />*/}
        {/*<ResultCount />*/}
        <div className='columns'>
          <div className='column is-narrow'>
            <Paper>
              <LeftMenu />
            </Paper>
          </div>
          <div className='column'>
            <Paper>
            <Tabs
          value={tabIndex}
          indicatorColor="primary"
          textColor="primary"
          onChange={tabChange}
        >
          <Tab label="All" />
          <Tab label="Blocks" />
          <Tab label="Transactions" />
        </Tabs>
             <Content />
             </Paper>
          </div>
        </div>
      </div>
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

