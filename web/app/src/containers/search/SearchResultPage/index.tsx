import * as React from "react";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";

import { search } from '../../../modules/search';

import Content from './Content';
import LeftMenu from './LeftMenu';


class SearchResultPageComponent extends React.Component {
  render() {
    return (
      <div>
        <Content />
      </div>
    );
  }
}



export const SearchMenu = () => (
  <div>
    <LeftMenu />
  </div>
);


export const SearchResultPage = withRouter(connect(mapStateToProps, { search })(SearchResultPageComponent));

function mapStateToProps(state, ownProps) {
  return {
    query: ownProps.location.query.q,
    page: ownProps.location.query.page || 0,
    chains: ownProps.location.query.chains,
    types: ownProps.location.query.types
  };
}

