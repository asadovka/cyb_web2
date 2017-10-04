import * as React from "react";
import {SearchResultComponent} from "../components/SearchResultComponent";
import {connect} from "react-redux";
import {CfState} from "../model/CfState";
import {CfActions, SearchResponse} from "../actions/CfActions";
import withRouter from "react-router/es/withRouter";

class SearchResultPageComponent extends React.Component<{ search, query, searchResult: SearchResponse }, {}> {

  componentDidMount() {
    const {search, query} = this.props;

    search(query);
  }

  render() {
    const {searchResult} = this.props;

    return (
      <SearchResultComponent searchResult={searchResult}/>
    );
  }
}

export const SearchResultPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResultPageComponent));

function mapStateToProps(state: CfState, ownProps) {
  return {
    searchResult: state.search,
    query: ownProps.location.query.q
  };
}

function mapDispatchToProps(dispatch) {
  return {
    search: (query: string) => {
      dispatch({
        type: CfActions.SEARCH,
        payload: {query}
      });
    }
  };
}
