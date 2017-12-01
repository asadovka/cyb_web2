import * as React from "react";

import App from '../app/';
     
import { connect } from 'react-redux';

import { showCrowdsalesDetails } from '../../modules/chaingear';

class CrowdsalesDetails extends React.Component<any, any> {
  componentDidMount() {

  }
  render() {
    const { crowdsalesDetails } = this.props;
    console.log(' crowdsalesDetails ', crowdsalesDetails);
    return (
      <App>
         Crowdsales Details
      </App>
    );    
  }
}

export default connect(
  state => ({
    crowdsalesDetails: state.chaingear.crowdsalesDetails.data
  }),
  { showCrowdsalesDetails }
)(CrowdsalesDetails);
