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
import EthereumClassicBlock from './items/EthereumClassicBlock';
import EthereumTx from './items/EthereumTx';
import EthereumClassicTx from './items/EthereumClassicTx';

import { SectionTitle, SectionsContainer } from '../../../components/SectionTitle/';

const Content = ({
  searchResult,
  chains,
  entities,
  search,
  query,
  showMore
}) => (
  <div>
    <div>
    {results(searchResult.items, searchResult.loading, searchResult.error, searchResult.success)}
    </div>
    {(searchResult.showMore) && <div style={{ textAlign: 'center', marginTop: 40 }}>
      <button onClick={() => showMore({ query, chains, entities })} className='button is-large'>show more</button>
    </div>}
  </div>
);



function results(items, loading, error, success) {
  if (loading) {
    return (
      <div className="tile is-child box">
        <h1 className="title">Loading...</h1>
      </div>
    );
  } 

  if (error) {
    return (
      <div className="tile is-child box">
        <h1 className="title">Some error occurred, please try later.</h1>
      </div>
    );
  }

  if (success && !items.length) {
    return (
      <div className="tile is-child box">
        <h1 className="title">Nothing is found in cyber•Space.</h1>
      </div>
    );
  }
  
  const blocks = items.filter(item => item.entity === 'BLOCK');
  const transactions = items.filter(item => item.entity === 'TRANSACTION');


  return (
    <SectionsContainer>
      {blocks.length > 0 && (<div>
        <SectionTitle>Blocks</SectionTitle>
        <div className='columns is-multiline'>
        {blocks.map((item, index) => (
          <div key={JSON.stringify(item)} className="column is-one-third">
            <ul style={{ overflow: 'hidden' }}>
              <li><RenderByType chain={item.chain} entity={item.entity} data={item.data} /></li>
            </ul>
          </div>
        ))}
        </div>
      </div>)}

      {transactions.length > 0 && (<div>
        <SectionTitle>Transactions</SectionTitle>
        <div className='columns is-multiline'>
        {transactions.map((item, index) => (
          <div key={JSON.stringify(item)} className="column is-one-third">
            <ul style={{ overflow: 'hidden' }}>
              <li><RenderByType chain={item.chain} entity={item.entity} data={item.data} /></li>
            </ul>
          </div>
        ))}
        </div>
      </div>)}
    </SectionsContainer>
   ); 
}




const items = {
  BLOCK: {
    BITCOIN: BitcoinBlock,
    ETHEREUM: EthereumBlock,
    BITCOIN_CASH: BitcoinCashBlock,
    ETHEREUM_CLASSIC: EthereumClassicBlock
  },
  TRANSACTION: {
    BITCOIN: BitcoinTx,
    BITCOIN_CASH: BitcoinCashTx,
    ETHEREUM: EthereumTx,
    ETHEREUM_CLASSIC: EthereumClassicTx
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
    entities: ownProps.location.query.entities  
})), { showMore })(Content));

