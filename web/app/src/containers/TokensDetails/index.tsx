import * as React from "react";
import withRouter from "react-router/es/withRouter";
     
import { connect } from 'react-redux';

import { showTokensDetails, closeConnection } from './module';

import TradesTable from './TradesTable';
import PriceChart from './PriceChart';
import OrderTables from './OrderTables';
import TokenDetails from './TokenDetails';
import OrderBookChart from './OrderBookChart';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { getSystemLogoUrl } from '../Tokens/module';
import { CircularProgress } from 'material-ui/Progress';

import CoinLinks from './CoinLinks';
import Tabs, { Tab } from '../../components/Tabs/';
//'material-ui/Tabs';


class TokensDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { symbol, base } = this.props;
    this.props.showTokensDetails(symbol, base);
  }

  componentWillUnmount(){
    this.props.closeConnection();
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  render() {
    const { success, data, crowdsalesDetails } = this.props;
    const { value } = this.state;
    return (
      <div>
        <TokenDetails />
         
        <Tabs value={value} onChange={this.handleChange}>
          <Tab label='Price' value={0}/>
          {/*<Tab label='Markets' value={1}/>
          {crowdsalesDetails.success && crowdsalesDetails.data.specs && <Tab label='Spec' value={2}/>}*/}
          <Tab label='Link' value={3}/>
        </Tabs>
        <Card style={{ padding: '40px 60px', marginBottom: 40 }}>
          <CardContent>
        {value === 0 && <div>
          <PriceChart />
        </div>}
        {/*value === 1 && <div>  
          <OrderBookChart />
          <OrderTables />
          <TradesTable />
        </div>*/}
        
        {/*value === 2 && <div>  
           {(crowdsalesDetails.success && crowdsalesDetails.data.specs) ? JSON.stringify(crowdsalesDetails.data.specs): null}
        </div>*/}

        {value === 3 && <div>  
           <CoinLinks />
        </div>}
          </CardContent>
        </Card>
               
       </div>
    );    
  }
}


export default withRouter(connect(
  (state, ownProps) => ({
    symbol: ownProps.routeParams.symbol,
    base: ownProps.routeParams.base,
    crowdsalesDetails: state.tokensDetails.tokensDetails,
    tokensPriceChartGDAX: state.tokensDetails.tokensPriceChartGDAX,
    tokensPriceChartHitBtc: state.tokensDetails.tokensPriceChartHitBtc
  }),
  { showTokensDetails, closeConnection }
)(TokensDetails));