import * as React from "react";
import {SearchResultComponent} from "./SearchResultComponent";
import {connect} from "react-redux";
import {CfState} from "../../model/CfState";
import {CfActions, SearchResponse} from "../../actions/CfActions";
import withRouter from "react-router/es/withRouter";

import { search } from '../../modules/search';


class SearchResultPageComponent extends React.Component<{ search, query, page, searchResult: SearchResponse }, {}> {

  componentDidMount() {
    const { query, page} = this.props;

    this.props.search(query, page);
  }

  render() {
    const {searchResult} = this.props;

    return (
      <SearchResultComponent search={this.props.search} searchResult={searchResult}/>
    );
  }
}

export const SearchResultPage = withRouter(connect(mapStateToProps, { search })(SearchResultPageComponent));

function mapStateToProps(state: CfState, ownProps) {
  return {
    searchResult: state.search,
    query: ownProps.location.query.q,
    page: ownProps.location.query.page || 0
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     search: (query: string, page: number) => {
//       dispatch({
//         type: CfActions.SEARCH,
//         payload: {query, page}
//       });
//     }
//   };
// }
