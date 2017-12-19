import * as React from "react";
import {Link} from "react-router";
import {Logo} from "../../components/logo/Logo";

import BlockchainStatics from './BlockchainStatics';

import { connect } from 'react-redux';

class IndexPage extends React.Component {
  componentDidMount() {
    this.props.getStatistics();
  }

  render() {
    return (
      <div>               
          <BlockchainStatics />        
      </div>
    );    
  }
}

import { getStatistics } from '../../modules/search';

export default connect(
  null,
  { getStatistics }
)(IndexPage);
