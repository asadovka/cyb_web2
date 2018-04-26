import * as React from "react";
import { Link } from 'react-router';
import {connect} from "react-redux";

// import {Pagination} from "../../../components/Pagination";
import withRouter from "react-router/es/withRouter";

import {
  Plain, BitcoinAddress, 
} from '../../../components/SearchItems/';

import BitcoinCashBlock from './items/BitcoinCashBlock';
import BitcoinCashTx from './items/BitcoinCashTx';
import BitcoinTx from './items/BitcoinTx';
import BitcoinBlock from './items/BitcoinBlock';

import EthereumBlock from './items/EthereumBlock';
import EthereumUncle from './items/EthereumUncle';
import EthereumTx from './items/EthereumTx';
import EthereumAddress from './items/EthereumAddress';

import EthereumClassicBlock from './items/EthereumClassicBlock';
import EthereumClassiUncle from './items/EthereumClassiUncle';
import EthereumClassicTx from './items/EthereumClassicTx';
import EthereumClassicContract from './items/EthereumClassicContract';

import Paper from 'material-ui/Paper';

import { Container } from '../../../components/SearchItems/';
import { SectionTitle, SectionsContainer } from '../../../components/SectionTitle/';


import InfiniteScroll from 'react-infinite-scroller';

import {Injector} from "../../../injector";

const {
  searchApi,
  http
} = Injector.of();

class Content extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      loading: false,
      error: false,
      success: false,
      hasMoreItems: true,
      page: 0
    }
    this.loadItems = this.loadItems.bind(this);
  }

  // componentDidMount() {
  //   const { query, page, chains, types } = this.props;
  //   this.props.search(query, page, chains, types);
  // }

  componentWillReceiveProps(nextPorps) {
    const { query, page, chains, types } = this.props;

    if (nextPorps.query !== query || 
        nextPorps.page !== page || 
        nextPorps.chains !== chains || 
        nextPorps.types !== types) {
      this.setState({
        loading: true
      })
      searchApi.search(nextPorps.query, 0 , nextPorps.chains, nextPorps.types, 10)
        .then(data => {
          this.setState({
            loading: false,
            items: data.items,
            hasMoreItems: data.items.length < data.totalHits
          })
        })
      // this.props.search(nextPorps.query, nextPorps.page, nextPorps.chains, nextPorps.types); 

    }
  }

  loadItems(page) {
    // console.log('loadItems ', page);
    const {
       query,
       // page,
       chains,
       types
    } = this.props;

    searchApi.search(query, page - 1 , chains, types, 10)
      .then(data => {
        //console.log(data);
        const newItems = this.state.items.concat(data.items);
        this.setState({
          items: newItems,
          hasMoreItems: newItems.length < data.totalHits
        })
      })
  }

  componentDidMount() {
    // const page = 0;
    // searchApi.search('0x7d5a4369273c723454ac137f48a4f142b097aa2779464e6505f1b1c5e37b5382', page, null, null, 10)
    //   .then(data => {
    //     //console.log(data);
    //     const newItems = this.state.items.concat(data.items);
    //     this.setState({
    //       loading: false,
    //       items: newItems,
    //       hasMoreItems: newItems.length < data.totalHits
    //     })
    //   })
  }

  render() {
    const {
      items,
      loading,
      error,
      success
    } = this.state;

    if (loading) {
      return (
         <Container>
        <div className="tile is-child">
          <h1 className="title">Loading...</h1>
        </div>
        </Container>
      );
    } 

    if (error) {
      return (
        <Container>
        <div className="tile is-child">
          <h1 className="title">Some error occurred, please try later.</h1>
        </div>
        </Container>
      );
    }

    if (success && !items.length) {
      return (
         <Container >
        <div className="tile is-child">
          <h1 className="title">Nothing is found in cyber•Space.</h1>
        </div>
        </Container>
      );
    }

    return (
      <Container>
      <InfiniteScroll
                pageStart={0}
                loadMore={this.loadItems}
                hasMore={this.state.hasMoreItems}
                loader={<div>loading</div>}>
        {items.map((item, i) => (
        <RenderByType 
          key={i}
          chain={item.chain} 
          entity={item.entity} 
          data={item.data} 
        />
      ))}

      </InfiniteScroll>
      </Container>
    );
  }
}



const items = {
  block: {
    // BITCOIN: BitcoinBlock,
    ethereum: EthereumBlock,
    // BITCOIN_CASH: BitcoinCashBlock,
    ethereum_classic: EthereumClassicBlock
  },
  tx: {
    // BITCOIN: BitcoinTx,
    // BITCOIN_CASH: BitcoinCashTx,
    ethereum: EthereumTx,
    ethereum_classic: EthereumClassicTx,
    // ethereum_classic: EthereumClassicTx
  },
  uncle: {
    ethereum: EthereumUncle,
    ethereum_classic: EthereumClassiUncle
  },
  contract_summary: {
     ethereum: EthereumAddress,
     ethereum_classic: EthereumClassicContract
  }
}

function RenderByType({ chain, data , entity} ) {
  const Component = items[entity][chain];
  if (Component) {
    return (<Component {...data} />)
  }
  return (
    <Plain {...data}/>
  );
}

import { showMore } from '../../../modules/search';

export default withRouter(connect(((state, ownProps) => ({
    searchResult: state.search.searchResults,
    query: ownProps.location.query.q,
    page: ownProps.location.query.page || 0,
    chains: ownProps.location.query.chains,
    types: ownProps.location.query.types 
})), { showMore })(Content));

