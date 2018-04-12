import * as React from "react";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";

import { getEthereumTx } from '../../../modules/search';
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

class EthereumTxPage extends React.Component {
  componentDidMount() {
    const {txHash, getData} = this.props;

    getData(txHash);
  }

  render() {
    const {data} = this.props;

    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <Title inline={true}>Ethereum Transaction</Title>
        </div>
        <SubTitle>Overview</SubTitle>
        <Details>
          <DetailsRow>
            <Label>timestamp</Label>
            <Value>{data.block_time && (moment(data.block_time * 1000).fromNow() + ' (' + moment(data.block_time * 1000).format('') + ')')}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>transaction hash</Label>
            <Value>{data.hash}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>block</Label>
            <Value>{data.block_number}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>nonce</Label>
            <Value>{data.nonce}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>status</Label>
            <Value>Confirmed (???, ??? confirmations)</Value>
          </DetailsRow>
        </Details>

        <SubTitle>Details</SubTitle>
        <Details>
          <DetailsRow>
            <Label>Type</Label>
            <Value>???</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>from</Label>
            <Value>{data.from}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>to</Label>
            <Value>{data.to} ???</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>value</Label>
            <Value>{data.value}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>fee</Label>
            <Value>{data.fee}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>gas price</Label>
            <Value>{data.gas_price}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>gas used</Label>
            <Value>{data.gas_used}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>gas limit</Label>
            <Value>{data.gas_limit}</Value>
          </DetailsRow>
        </Details>

        <SubTitle>Data</SubTitle>
        <Details>
          <DetailsRow>
            <Label>input</Label>
            <Value>???</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>logs</Label>
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
      txHash: ownProps.routeParams.txHash,
      data: state.search.ethereumTx.data
    }),
    { getData: getEthereumTx }
  )(EthereumTxPage)
);


