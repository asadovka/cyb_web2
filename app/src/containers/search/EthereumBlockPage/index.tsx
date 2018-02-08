import * as React from "react";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";

import { getEthereumBlock } from '../../../modules/search';
import { browserHistory } from 'react-router'

import moment from 'moment'

import { Titile } from '../../../components/Title/';
import { 
  Head, SubTitle, Button,
  Details, DetailsRow, Label, Value,
  TLink, TransactionsTable
} from '../../../components/ItemsDetails/';

import Tabs, { Tab } from '../../../components/Tabs/';

class EthereumBlockPageComponent extends React.Component {
  componentDidMount() {
    const {blockNumber, getData} = this.props;

    getData(blockNumber);
  }

  render() {
    const {ethereumBlock, transactions } = this.props;
    return (
      <div>
        <Head>
          <Button>previous</Button>
          <Titile inline={true}>Ethereum Block #{ethereumBlock.number}</Titile>
          <Button>next</Button>
        </Head>
        <SubTitle>Block info</SubTitle>
        <Details>
          <DetailsRow>
            <Label>timestamp</Label>
            <Value>{ethereumBlock.timestamp && moment(ethereumBlock.timestamp.epochSecond).format('YYYY/MM/DD')}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>block hash</Label>
            <Value>{ethereumBlock.hash}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>sha3uncles</Label>
            <Value>{ethereumBlock.sha3_uncles}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>block size</Label>
            <Value>{ethereumBlock.size}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>nonce</Label>
            <Value>???</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>extra data</Label>
            <Value>{ethereumBlock.extra_data}</Value>
          </DetailsRow>
        </Details>
         
        <SubTitle>Summary</SubTitle>
        <Details>
          <DetailsRow>
            <Label>miner</Label>
            <Value>{ethereumBlock.miner}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>difficulty</Label>
            <Value>{ethereumBlock.difficulty}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>block reward</Label>
            <Value>{ethereumBlock.block_reward}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>block size</Label>
            <Value>{ethereumBlock.size}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>transaction fees</Label>
            <Value>{ethereumBlock.tx_fees}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>gas used</Label>
            <Value>{ethereumBlock.gas_used}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>gas limit</Label>
            <Value>{ethereumBlock.gas_limit}</Value>
          </DetailsRow>
        </Details>


        <SubTitle>Transaction</SubTitle>
        <Tabs value={1} onChange={() => {}}>
          <Tab label={`transaction: ${transactions.length}`} value={1}></Tab>
          <Tab label={'tuncle blocks: 0'} value={2}></Tab>
        </Tabs>
        <TransactionsTable>
          <thead>
            <tr>
              <th>Hash</th>
              <th>Age</th>
              <th>From</th>
              <th>To</th>
              <th>Value</th>
              <th>Fee</th>
            </tr>
          </thead>
          <thead>
            {transactions.map(t => (
              <tr key={t.hash}>
                <td><TLink hash={t.hash}/></td>
                <td>???</td>
                <td><TLink hash={t.from}/></td>
                <td><TLink hash={t.to}/></td>
                <td>{t.value}</td>
                <td>{t.fee}</td>
              </tr>
            ))}
          </thead>
        </TransactionsTable>
      </div>
    );
  }
}

export const EthereumBlockPage = withRouter(connect(mapStateToProps, { getData: getEthereumBlock })(EthereumBlockPageComponent));

function mapStateToProps(state, ownProps) {
  return {
    blockNumber: ownProps.routeParams.blockNumber,
    ethereumBlock: state.search.ethereumBlock.data,
    transactions: [
{
block_number: 1000000,
index: 0,
fee: "0.010407437722000000",
value: "100.000000000000000000",
hash: "0xea1093d492a1dcb1bef708f771a99a96ff05dcab81ca76c31940300177fcf49f",
from: "0x39fa8c5f2793459d6622857e7d9fbb4bd91766d3",
to: "0xc083e9947cf02b8ffc7d3090ae9aea72df98fd47",
creates_contract: false
},
{
block_number: 1000000,
index: 1,
fee: "0.003000000000000000",
value: "0.437194980000000000",
hash: "0xe9e91f1ee4b56c0df2e9f06c2b8c27c6076195a88a7b8537ba8313d80e6f124e",
from: "0x32be343b94f860124dc4fee278fdcbd38c102d88",
to: "0xdf190dc7190dfba737d7777a163445b7fff16133",
creates_contract: false
}
    ]
  };
}
