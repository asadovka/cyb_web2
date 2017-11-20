import * as React from "react";
import {SearchResultComponent} from "./SearchResultComponent";
import {connect} from "react-redux";
import {CfState} from "../../model/CfState";
import {CfActions, SearchResponse} from "../../actions/CfActions";
import withRouter from "react-router/es/withRouter";
import {Pagination} from "../../components/Pagination";

import { search } from '../../modules/search';


import { Link } from 'react-router';
import { Logo } from '../../components/logo/Logo';
import {Data} from "../../data/Data";
import {FooterComponent} from "../../components/FooterComponent/";

import { SearchForm } from '../SearchForm';

// TODO: divided into components

//import cx from 'classnames/bind'
var cx = require('classnames');

class SearchResultPageComponent extends React.Component<{ search, query, page, searchResult: SearchResponse }, {}> {

  componentDidMount() {
    const { query, page, coins, type } = this.props;

    this.props.search(query, page, coins, type);
  }

  componentWillReceiveProps(nextPorps) {
    const { query, page, coins, type } = nextPorps;

    if (this.props.query !== query || this.props.page !== page || this.props.coins !== coins || this.props.type !== type) {
      this.props.search(query, page, coins, type);    
    }
  }

  render() {
    const {searchResult, query, page, coins, type } = this.props;
      // <SearchResultComponent search={this.props.search} searchResult={searchResult}/>
    
    return (
      <div className='container'>
        <div className='navbar-menu'>
          <div className="navbar-start">
            <Logo />
          </div>
          <nav className='navbar-end'>
            <Link className='navbar-item' to='/'>Assets</Link>
            <Link className='navbar-item' to='/'>Funds</Link>
            <Link className='navbar-item' to='/'>Crowdsales</Link>
            <Link className='navbar-item is-active' to='/'>Blockchains</Link>
            <Link className='navbar-item' to='/'>Analytics</Link>
            <Link className='navbar-item' to='/'>Cybernode</Link>                           
          </nav>
        </div>
        <div>
          <SearchForm />
          <div className='tabs'>   
            <ul>                                 
              <li className={!type ? 'is-active' : ''}><Link  to={{ pathname:"/search", query: { q: query, coins } }}>All</Link></li>
              <li className={cx({ 'is-active': type === 'blocks' })}><Link  to={{ pathname:"/search", query: { q: query, coins, type: "blocks" } }}>Blocks</Link></li>
              <li className={cx({ 'is-active': type === 'transactions' })}><Link  to={{ pathname:"/search", query: { q: query, coins, type: "transactions" } }}>Transactions</Link></li>
              <li className={cx({ 'is-active': type === 'address' })}><Link  to={{ pathname:"/search", query: { q: query, coins, type: "address" } }}>Address</Link></li>
            </ul>
          </div>
          {searchResult.success && <span>About {searchResult.data.totalHits} results</span>}
          <div className='columns'>
            <div className='column is-narrow'>    
              <div className='menu'>
              <ul className='menu-list'>                                
                <li><Link className={cx({ 'is-active': !coins })} to={{ pathname:"/search", query: { q: query, type } }}>All</Link></li>
                <li><Link className={cx({ 'is-active': coins === 'blockchain' })} to={{ pathname:"/search", query: { q: query, coins: 'blockchain', type } }}>Blockchain</Link></li>
                <li><Link className={cx({ 'is-active': coins === 'etherium' })} to={{ pathname:"/search", query: { q: query, coins: 'etherium', type } }}>Etherium</Link></li>
              </ul>
              </div>
            </div>
            <div className='column'>
              <div>
              {results(searchResult.data.items, searchResult.loading, searchResult.error, searchResult.success)}
              </div>
              <Pagination
                loading={searchResult.loading || searchResult.error}
                page={searchResult.data.page}
                query={searchResult.data.query}
                total={Math.ceil(searchResult.data.totalHits / searchResult.data.pageSize)}
                onClick={(query, page) => {
                  this.props.search(query, page, coins, type)
                }}
              /> 
            </div>
          </div>
        </div>
        <div>
          <FooterComponent links={Data.links}/>
        </div>
      </div>
    );
  }
}


function results(items, loading, error, success) {
  if (loading) {
    return (
      <div className="tile is-child box">
        <h1 className="title">Loading...</h1>
      </div>
    );
  } else if (items.length) {
    return (
      <div className='columns is-multiline'>
      {items.map((item, index) => (
        <div key={JSON.stringify(item)} className="column is-one-third">
          <ul style={{ overflow: 'hidden' }}>
            <li>{`Type: ${item.type.toUpperCase().replace(/_/g , " ")}`}</li>
            <li>{renderByType(item.type, item.data)}</li>
          </ul>
        </div>
      ))}
      </div>
     );
  } else if (error) {
    return (
      <div className="tile is-child box">
        <h1 className="title">Some error occurred, please try later.</h1>
      </div>
    );
  } else if (success && !items.length) {
    return (
      <div className="tile is-child box">
        <h1 className="title">Nothing is found in cyber•Space.</h1>
      </div>
    );
  }
}

// coins=[bitcoin,ethereum]&type=[block,transaction,address]

export const SearchResultPage = withRouter(connect(mapStateToProps, { search })(SearchResultPageComponent));

function mapStateToProps(state: CfState, ownProps) {
  return {
    searchResult: state.search,
    query: ownProps.location.query.q,
    page: ownProps.location.query.page || 0,
    coins: ownProps.location.query.coins,
    type: ownProps.location.query.type
  };
}



function renderByType(type, data) {
  if (type === "bitcoin_block") {
    return bitcoin_block(data);
  } else if (type === "bitcoin_tx") {
    return bitcoin_tx(data);
  } else if (type === "bitcoin_address") {
    return bitcoin_address(data);
  } else if (type === "ethereum_block") {
    return ethereum_block(data);
  } else if (type === "ethereum_tx") {
    return ethereum_tx(data);
  } else {
    return plain(data);
  }
}

function plain(data) {
  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
}

function bitcoin_block(data) {
  return (
    <div>
      <ul>
        <li>{`Hash: ${data.hash}`}</li>
        <li>{`Height: ${data.height}`}</li>
        <li>{`Total outputs value: ${data.total_outputs_value}`}</li>
        <li>{`Time: ${data.time}`}</li>
        <li>{`Tx number: ${data.tx_number}`}</li>
      </ul>

      <Link to={`/bitcoin/block/${data.height}`}>
        View block
      </Link>
    </div>
  );
}

function bitcoin_tx(data) {
  return (
    <div>
        <ul>
        <li>{`Tx Id: ${data.txid}`}</li>
        <li>{`Block hash: ${data.block_hash}`}</li>
        <li>{`Block number: ${data.block_number}`}</li>
        <li>{`Block time: ${data.block_time}`}</li>
        <li>{`Total output: ${data.total_output}`}</li>
        <li>{`Fee: ${data.fee}`}</li>
        <li>{`Size: ${data.size}`}</li>
      </ul>

      <Link to={`/bitcoin/tx/${data.txid}`}>
        View transaction
      </Link>
    </div>
  );
}

function bitcoin_address(data) {
  return (
    <div>
      <ul>
        <li>{`Balance: ${data.balance}` + " BTC"}</li>
        <li>{`Address: ${data.id}`}</li>
        <li>{`No. Transactions: ${data.tx_number}`}</li>
        <li>{`Total Received: ${data.total_received}` + " BTC"}</li>
      </ul>
    </div>
  );
}

function ethereum_block(data) {
 return (
   <div>
     <ul>
       <li>{`Block hash: ${data.hash}`}</li>
       <li>{`Block number: ${data.number}`}</li>
       <li>{`Transactions count: ${data.tx_number}`}</li>
       <li>{`Block time: ${data.timestamp}`}</li>
       <li>{`Block size: ${data.size}`}</li>
     </ul>

     <Link to={`/ethereum/block/${data.number}`}>
       View block
     </Link>
   </div>
 );
}

function ethereum_tx(data) {
  return (
    <div>
      <ul>
        <li>{`Hash: ${data.hash}`}</li>
        <li>{`Block hash: ${data.block_hash}`}</li>
        <li>{`Block number: ${data.block_number}`}</li>
        <li>{`Block time: ${data.timestamp}`}</li>
        <li>{`Value: ${data.value} ETH`}</li>
        <li>{`Fee: ${data.fee} ETH`}</li>
      </ul>

      <Link to={`/ethereum/tx/${data.hash}`}>
        View transaction
      </Link>
    </div>
  );
}

