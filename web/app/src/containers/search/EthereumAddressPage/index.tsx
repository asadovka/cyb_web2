import * as React from "react";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";

import { getEthereumAddress } from '../../../modules/search';
import { browserHistory } from 'react-router'

import moment from 'moment'

import { Title } from '../../../components/Title/';
import { 
  Head, SubTitle, Button,
  Details, DetailsRow, Label, Value,
  TLink, TransactionsTable,
  EPrice,
  FlexContainer
} from '../../../components/ItemsDetails/';

import QRCode from '../../../components/QRCode';
import Robohash from '../../../components/Robohash';

import {Injector} from "../../../injector";

const {
  searchApi,
  http
} = Injector.of();

class EthereumTxPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };

  }

  componentDidMount() {
    const { hash } = this.props;
    searchApi.getEthereumContract(hash)
      .then(data => {
        this.setState({ data })
      })
  }

  render() {
    const {hash} = this.props;

    const {
      data
    } = this.state;

    if (!data) return null;

    return (
//        <Title inline={true}>Ethereum Contract</Title>

      <div>
        <Title>Ethereum Contract</Title>
        <Head>
          <div>
            <Robohash hash={hash} />
          </div>
          <div>
            <QRCode hash={hash} />
          </div>
          <div>
            <div style={{
              width: 55,
              height: 55,
              background: '#438cef',
              borderRadius: '50%',
              boxShadow: '0px 1px 4px #438cef'
            }}>
            </div>
          </div>
        </Head>
        <SubTitle>Overview</SubTitle>
        <Details>
          <DetailsRow>
            <Label>Time (UTC)</Label>
            <Value>{data.firstActivityDate && (moment(data.firstActivityDate * 1000).fromNow() + ' (' + moment(data.firstActivityDate * 1000).format('') + ')')}</Value>        
          </DetailsRow>
          <DetailsRow>
            <Label>Last activity</Label>
            <Value>{data.lastActivityDate && (moment(data.lastActivityDate * 1000).fromNow())}</Value>        
          </DetailsRow>
          <DetailsRow>
            <Label>address hash</Label>
            <Value>{data.hash}</Value>        
          </DetailsRow>
        </Details>

        <SubTitle>Balance</SubTitle>
        <Details>
          <DetailsRow>
            <Label>Transactions</Label>
            <Value>{data.txNumber}</Value>        
          </DetailsRow>
          <DetailsRow>
            <Label>Unconfirmed transactions</Label>
            <Value>???</Value>        
          </DetailsRow>
          <DetailsRow>
            <Label>Lifetime balance</Label>
            <Value>???</Value>        
          </DetailsRow>
          <DetailsRow>
            <Label>Current balance</Label>
            <Value>{data.confirmedBalance} ETH</Value>        
          </DetailsRow>
          <DetailsRow>
            <Label>Current balance with unconfirmed transactions</Label>
            <Value>???</Value>        
          </DetailsRow>
        </Details>
      </div>
    );
  }
}

export default withRouter(
  connect(
    (state, ownProps) => ({
      hash: ownProps.routeParams.hash,
      transactions: [
        { hash: '27c4d937dca276fb2b61e579902e8a876fd5b5abc17590410ced02d5a9f8e483'}
      ]
    }),
    { getData: getEthereumAddress }
  )(EthereumTxPage)
);


