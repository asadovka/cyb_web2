import * as React from "react";
import {connect} from "react-redux";


const ResultCount = ({ searchResult }) => (
  <span>
    {searchResult.success && <span>About {searchResult.data.totalHits} results</span>}
  </span>
);

export default connect(state => ({
  searchResult: state.search,
}))(ResultCount)
