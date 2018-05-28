import * as React from "react";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";

import { getEthereumClassicBlock } from '../../../modules/search';
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

import Tabs, { Tab } from '../../../components/Tabs/';
var numeral = require('numeral');

const procent = (a, b) => {
  const max = Math.max(a, b);
  const min = Math.min(a, b);
  return numeral(100 * min / max).format('0.00') + '%';
}

import {Injector} from "../../../injector";

const {
  searchApi,
} = Injector.of();

class EthereumClassicBlockPage extends React.Component {
  constructor(props) {
    super(props);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.loadTransactions = this.loadTransactions.bind(this);
    this.state = {
      transactions: []
    }
  }

  loadTransactions(blockNumber) {
    searchApi.getEthereumClassicTxsByBlockNumber(blockNumber, 0, 10)
      .then(data => {
        this.setState({ transactions: data })
      })    
  }

  componentDidMount() {
    const {blockNumber, getData} = this.props;

    getData(blockNumber);
    this.loadTransactions(blockNumber);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.blockNumber !== nextProps.blockNumber) {
      this.props.getData(nextProps.blockNumber);
      this.loadTransactions(nextProps.blockNumber)
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
    const {data, eth_usd_price_on_date, timeAfterPreviosBlock } = this.props;
    
    const { transactions } = this.state;

    if (!data) return null;

    const tx_fees_usd = numeral((+data.tx_fees) * eth_usd_price_on_date).format('$0.00');
    return (
      <div className='container' style={{ width: 1090 }}>
        <Head>
          <Button onClick={this.previous}>previous</Button>
          <Title inline={true}>Ethereum Classic Block #{data.number}</Title>
          <Button onClick={this.next}>next</Button>
        </Head>
        <SubTitle>Overview</SubTitle>
        <Details>
          <DetailsRow>
            <Label>Time (UTC)</Label>
            <Value>{data.timestamp && (moment(data.timestamp * 1000).fromNow() + ' (' + moment(data.timestamp * 1000).format('') + ')')}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>block hash</Label>
            <Value>{data.hash}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>sha3uncles</Label>
            <Value>{data.sha3Uncles}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>block size</Label>
            <Value>{data.size} bytes</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>nonce</Label>
            <Value>???</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>extra data</Label>
            <Value>{data.extraData}</Value>
          </DetailsRow>
        </Details>
         
        <SubTitle>Mining</SubTitle>
        <Details>
          <DetailsRow>
            <Label>miner</Label>
            <Value>{data.minerContractHash}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>difficulty</Label>
            <Value>{numeral(data.difficulty).format('000,000,000')}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>gas used</Label>
            <Value>{procent(+data.gasUsed, +data.gasLimit)} ({numeral(data.gasUsed).format('000,000,000')} of {numeral(data.gasLimit).format('000,000,000')})</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>gas limit</Label>
            <Value>{numeral(data.gasLimit).format('000,000,000')}</Value>
          </DetailsRow>
          {/*<DetailsRow>
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
          </DetailsRow>*/}
        </Details>

        <SubTitle>Rewards</SubTitle>
        <Details>
          <DetailsRow>
            <Label>static block reward</Label>
            <Value>{numeral((+data.blockReward)).format('0.000000')} ETH</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>transaction fees</Label>
            <Value>{numeral((+data.txFees)).format('0.000000')} ETH</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>uncle inclusion reward</Label>
            <Value>{numeral((+data.unclesReward)).format('0.000000')} ETH</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>total block reward</Label>
            <Value>{numeral((+data.blockReward) + (+data.txFees) + (+data.unclesReward)).format('0.000000')} ETH</Value>
          </DetailsRow>
        </Details>

        <SubTitle>Transaction</SubTitle>
        <FlexContainer>
          <Tabs value={1} onChange={() => {}}>
            <Tab label={`transaction: ${data.txNumber}`} value={1}></Tab>
            {/*<Tab label={'uncle blocks: 0'} value={2}></Tab>*/}
          </Tabs>
          {/*<div>
            <Button>download</Button>
          </div>*/}
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
            {transactions.slice(0, 10).map(t => (
              <tr key={t.hash}>
                <td><TLink hash={t.hash} to={`/ethereum/tx/${t.hash}`}/></td>
                <td>{t.timestamp && moment(t.timestamp * 1000).fromNow()}</td>
                <td><TLink hash={t.from} to={`/ethereum/contract/${t.from}`}/></td>
                <td><TLink hash={t.to} to={`/ethereum/contract/${t.to}`}/></td>
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

export default withRouter(
  connect(
    (state, ownProps) => ({
      blockNumber: ownProps.routeParams.blockNumber,
      data: state.search.ethereumClassicBlock.data,
      transactions: []
    }),
    { getData: getEthereumClassicBlock }
  )(EthereumClassicBlockPage)
);

