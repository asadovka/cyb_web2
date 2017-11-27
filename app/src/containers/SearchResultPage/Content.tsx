import * as React from "react";
import { Link } from 'react-router';
import {connect} from "react-redux";

import {Pagination} from "../../components/Pagination";
import withRouter from "react-router/es/withRouter";

import { BitcoinBlock, Plain, BitcoinTx, BitcoinAddress, EthereumBlock, EthereumTx } from '../../components/SearchItems/';

import { SectionTitle, SectionsContainer } from '../../components/SectionTitle/';

const Content = ({
  searchResult,
  coins,
  type,
  search
}) => (
  <div>
    <div>
    {results(searchResult.data.items, searchResult.loading, searchResult.error, searchResult.success)}
    </div>
    <Pagination
      loading={searchResult.loading || searchResult.error}
      page={searchResult.data.page}
      query={searchResult.data.query}
      total={Math.ceil(searchResult.data.totalHits / searchResult.data.pageSize)}
      onClick={(query, page) => {
        search(query, page, coins, type)
      }}
    /> 
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
  
  const blocks = items.filter(item => item.type === 'bitcoin_block' || item.type === 'ethereum_block');
  const transactions = items.filter(item => item.type === 'bitcoin_tx' || item.type === 'ethereum_tx');


  return (
    <SectionsContainer>
      {blocks.length > 0 && (<div>
        <SectionTitle>Blocks</SectionTitle>
        <div className='columns is-multiline'>
        {blocks.map((item, index) => (
          <div key={JSON.stringify(item)} className="column is-one-third">
            <ul style={{ overflow: 'hidden' }}>
              <li><RenderByType type={item.type} data={item.data} /></li>
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
              <li><RenderByType type={item.type} data={item.data} /></li>
            </ul>
          </div>
        ))}
        </div>
      </div>)}
    </SectionsContainer>
   ); 
}


const items = {
  bitcoin_block: BitcoinBlock,
  bitcoin_tx: BitcoinTx, 
  bitcoin_address: BitcoinAddress, 
  ethereum_block: EthereumBlock, 
  ethereum_tx: EthereumTx
}

function RenderByType({ type, data} ) {
  const Component = items[type];
  if (Component) {
    return (<Component {...data} />)
  }
  return (
    <Plain {...data}/>
  );
}

export default withRouter(connect(((state, ownProps) => ({
    searchResult: state.search,
    query: ownProps.location.query.q,
    page: ownProps.location.query.page || 0,
    coins: ownProps.location.query.coins,
    type: ownProps.location.query.type  
})))(Content));

