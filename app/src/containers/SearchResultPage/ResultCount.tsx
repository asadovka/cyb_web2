import * as React from "react";
import {connect} from "react-redux";

import { Count } from '../../components/ResultCount/'

const ResultCount = ({ searchResult }) => (
  <Count>
    {searchResult.success && <span>About {searchResult.data.totalHits} results</span> }&nbsp;
  </Count>
);

export default connect(state => ({
  searchResult: state.search.searchResults,
}))(ResultCount)
