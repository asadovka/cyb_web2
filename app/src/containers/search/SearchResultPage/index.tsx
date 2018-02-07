import * as React from "react";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";

import { search } from '../../../modules/search';

import Content from './Content';
import LeftMenu from './LeftMenu';
import Tabs from './Tabs';

import { FilterPanel } from '../../../components/searchPage/'
import { Layout, LayoutSideBar, LayoutContent} from '../../../components/searchPage/Layout/';



class SearchResultPageComponent extends React.Component {

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
      this.props.search(nextPorps.query, nextPorps.page, nextPorps.chains, nextPorps.entities);    
    }
  }

  render() {
    return (
      <Layout>
        <LayoutSideBar>
          <LeftMenu />
        </LayoutSideBar>
        <LayoutContent>
          <Tabs />
          <Content />
        </LayoutContent>
      </Layout>
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

