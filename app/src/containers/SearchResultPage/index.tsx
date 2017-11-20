import * as React from "react";
import {SearchResultComponent} from "./SearchResultComponent";
import {connect} from "react-redux";
import {CfState} from "../../model/CfState";
import {CfActions, SearchResponse} from "../../actions/CfActions";
import withRouter from "react-router/es/withRouter";

class SearchResultPageComponent extends React.Component<{ search, query, page, searchResult: SearchResponse }, {}> {

  componentDidMount() {
    const {search, query, page} = this.props;

    search(query, page);
  }

  render() {
    const {searchResult, search} = this.props;

    return (
      <SearchResultComponent search={search} searchResult={searchResult}/>
    );
  }
}

export const SearchResultPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResultPageComponent));

function mapStateToProps(state: CfState, ownProps) {
  return {
    searchResult: state.search,
    query: ownProps.location.query.q,
    page: ownProps.location.query.page || 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    search: (query: string, page: number) => {
      dispatch({
        type: CfActions.SEARCH,
        payload: {query, page}
      });
    }
  };
}
