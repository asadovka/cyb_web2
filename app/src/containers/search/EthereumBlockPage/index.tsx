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
  TLink, TransactionsTable,
  EPrice,
  FlexContainer
} from '../../../components/ItemsDetails/';

import Tabs, { Tab } from '../../../components/Tabs/';
var numeral = require('numeral');

const procent = (a, b) => {
  const max = Math.max(a, b);
  const min = Math.min(a, b);
  return numeral(100 * min / max).format('0.00') + '%';
}

class EthereumBlockPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);    
  }

  componentDidMount() {
    const {blockNumber, getData} = this.props;

    getData(blockNumber);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.blockNumber !== nextProps.blockNumber) {
      this.props.getData(nextProps.blockNumber);
    }
  }

  previous() {
    const { blockNumber } = this.props;
    browserHistory.push(`/ethereum/block/${(+blockNumber) - 1}`)
  }

  next() {
    const { blockNumber } = this.props;
    browserHistory.push(`/ethereum/block/${(+blockNumber) + 1}`)
  }

  render() {
    const {ethereumBlock, transactions, eth_usd_price_on_date, timeAfterPreviosBlock } = this.props;
    const tx_fees_usd = numeral((+ethereumBlock.tx_fees) * eth_usd_price_on_date).format('$0.00');
    return (
      <div>
        <Head>
          <Button onClick={this.previous}>previous</Button>
          <Titile inline={true}>Ethereum Block #{ethereumBlock.number}</Titile>
          <Button onClick={this.next}>next</Button>
        </Head>
        <SubTitle>Block info</SubTitle>
        <Details>
          <DetailsRow>
            <Label>timestamp</Label>
            <Value>{ethereumBlock.timestamp && (moment(ethereumBlock.timestamp * 1000).fromNow() + ' (' + moment(ethereumBlock.timestamp * 1000).format('') + ')')}</Value>
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
            <Value>{ethereumBlock.size} bytes</Value>
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
            <Value>{ethereumBlock.miner}(???) {timeAfterPreviosBlock}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>difficulty</Label>
            <Value>{numeral(ethereumBlock.difficulty).format('000,000,000')}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>block reward</Label>
            <Value>{numeral((+ethereumBlock.block_reward) + (+ethereumBlock.tx_fees)).format('0.000000')} ETH ({numeral(ethereumBlock.block_reward).format('0.000000')} + {numeral(ethereumBlock.tx_fees).format('0.000000')} + ???)</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>transaction fees</Label>
            <Value>{numeral(ethereumBlock.tx_fees).format('0.000000')} ETH | {tx_fees_usd} ({procent(+ethereumBlock.block_reward, +ethereumBlock.tx_fees)} of he total block reward)</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>gas used</Label>
            <Value>{procent(+ethereumBlock.gas_used, +ethereumBlock.gas_limit)} ({numeral(ethereumBlock.gas_used).format('000,000,000')} of {numeral(ethereumBlock.gas_limit).format('000,000,000')})</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>gas limit</Label>
            <Value>{numeral(ethereumBlock.gas_limit).format('000,000,000')}</Value>
          </DetailsRow>
        </Details>


        <SubTitle>Transaction</SubTitle>
        <FlexContainer>
          <Tabs value={1} onChange={() => {}}>
            <Tab label={`transaction: ${ethereumBlock.tx_number}`} value={1}></Tab>
            <Tab label={'uncle blocks: 0'} value={2}></Tab>
          </Tabs>
          <div>
            <Button>download</Button>
          </div>
        </FlexContainer>
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
                <td>{ethereumBlock.timestamp && moment(ethereumBlock.timestamp * 1000).fromNow()}</td>
                <td><TLink hash={t.from}/></td>
                <td><TLink hash={t.to}/></td>
                <td><EPrice value={t.value} icon={true}/></td>
                <td><EPrice value={t.value} /></td>
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
    transactions: state.search.ethereumTxs.data,
    eth_usd_price_on_date: state.search.eth_usd_price_on_date,
    timeAfterPreviosBlock: state.search.timeAfterPreviosBlock
  };
}
