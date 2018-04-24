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

class EthereumUncle extends React.Component {
  constructor(props) {
    super(props);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);    
  }

  componentDidMount() {
    // const {hash, getData} = this.props;

    // getData(hash);
  }

  previous() {
    const { number } = this.props.ethereumUncleBlock;
    browserHistory.push(`/ethereum/block/${(+number) - 1}`)
  }

  next() {
    const { number } = this.props.ethereumUncleBlock;
    browserHistory.push(`/ethereum/block/${(+number) + 1}`)
  }

  render() {
    const {hash, ethereumUncleBlock } = this.props;

    // const rows = this.props.transactions.map(t => (
    //   <tr>
    //     <td>{t.txHash}</td>
    //   </tr>
    // ))
   
    return (
      <div>
        <Head>
          <Button onClick={this.previous}>previous</Button>
          <Title inline={true}>Ethereum Uncle Block #{ethereumUncleBlock.number}</Title>
          <Button onClick={this.next}>next</Button>
        </Head>
        <SubTitle>Overview</SubTitle>
        <Details>
          <DetailsRow>
            <Label>Time (UTC)</Label>
            <Value>{ethereumUncleBlock.timestamp && (moment(ethereumUncleBlock.timestamp * 1000).fromNow() + ' (' + moment(ethereumUncleBlock.timestamp * 1000).format('') + ')')}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>parent block height</Label>
            <Value>{ethereumUncleBlock.blockNumber}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>parent block hash</Label>
            <Value>{ethereumUncleBlock.blockHash}</Value>
          </DetailsRow>
          <DetailsRow>
            <Label>uncle level</Label>
            <Value>{ethereumUncleBlock.position}</Value>
          </DetailsRow>
        </Details>

        <SubTitle>Mining</SubTitle>
        <Details>
          <DetailsRow>
            <Label>miner</Label>
            <Value>{ethereumUncleBlock.miner}</Value>
          </DetailsRow>
        </Details>

        <SubTitle>Rewards</SubTitle>
        <Details>
          <DetailsRow>
            <Label>uncle inclusion reward</Label>
            <Value>{ethereumUncleBlock.uncleReward} ETH</Value>
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
      // transactions: [
      //   { hash: '27c4d937dca276fb2b61e579902e8a876fd5b5abc17590410ced02d5a9f8e483'}
      // ]
      ethereumUncleBlock: {
        timestamp: 1517325544,
        number: 5000399,
        blockNumber: 5000401,
        position: 0,
        uncleReward: "2.25",
        miner: '0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5',
        hash: '0xf3b46e902224d0a81fa43ff43f99ec67d5880ea8706d19a30197769dc7ac090d',
        blockHash: '0x4dbe093a59f9c9afe58006dac3fe21fe701932176b77f21ce2372e8d2dc64ebe'
      }
    }),
    // { getData: getEthereumAddress }
  )(EthereumUncle)
);


