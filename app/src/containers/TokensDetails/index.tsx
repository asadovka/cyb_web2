import * as React from "react";
import withRouter from "react-router/es/withRouter";

import App from '../app/';
     
import { connect } from 'react-redux';

import {Injector} from "../../injector";
const {
  chaingearApi
} = Injector.of();

import { showTokensDetails, getSystemLogoUrl, closeConnection } from '../../modules/chaingear';

import TradesTable from './TradesTable';
import PriceChart from './PriceChart';
import OrderTables from './OrderTables';
import TokenDetails from './TokenDetails';

import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from '../../components/Table/';
import Card, { CardActions, CardContent } from 'material-ui/Card';


class TokensDetails extends React.Component {
  componentDidMount() {
    const { symbol } = this.props;
    this.props.showTokensDetails(symbol);
  }

  componentWillUnmount(){
    this.props.closeConnection();
  }

  render() {
    const { success, data } = this.props;
    return (
      <div>
        <TokenDetails />
         
        <PriceChart />
        
        <TradesTable />

        <OrderTables />
                  
        {success && <div style={{ marginTop: 20 }}>
           You can improve <a href={`https://github.com/cyberFund/chaingear/blob/gh-pages/sources/${data.system}/${data.system}.toml`}>{data.system}'s</a> page on Github.
        </div>}
       </div>
    );    
  }
}


export default withRouter(connect(
  (state, ownProps) => ({
    symbol: ownProps.routeParams.symbol,
    crowdsalesDetails: state.chaingear.tokensDetails
  }),
  { showTokensDetails, closeConnection }
)(TokensDetails));
