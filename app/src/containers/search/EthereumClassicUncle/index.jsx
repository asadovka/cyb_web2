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


import {Injector} from "../../../injector";

const {
  searchApi,
  http
} = Injector.of();

class EthereumUncle extends React.Component {
  constructor(props) {
    super(props);

    // this.previous = this.previous.bind(this);
    // this.next = this.next.bind(this);    

    this.state = {
      ethereumUncleBlock: null
    }
  }

  componentDidMount() {
    const { hash } = this.props;
    searchApi.getEthereumClassicUncle(hash)
      .then(data => {
        this.setState({
          ethereumUncleBlock: data
        })
      })
  }

  // previous() {
  //   const { number } = this.props.ethereumUncleBlock;
  //   browserHistory.push(`/ethereum/block/${(+number) - 1}`)
  // }

  // next() {
  //   const { number } = this.props.ethereumUncleBlock;
  //   browserHistory.push(`/ethereum/block/${(+number) + 1}`)
  // }

  render() {
    const { ethereumUncleBlock } = this.state;

    if (!ethereumUncleBlock) return null;

    return (
      <div>
        <Head>
          <Title inline={true}>Ethereum Uncle Block #{ethereumUncleBlock.number}</Title>
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
            <Value>{ethereumUncleBlock.position + 1}</Value>
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
    }),
    // { getData: getEthereumAddress }
  )(EthereumUncle)
);


