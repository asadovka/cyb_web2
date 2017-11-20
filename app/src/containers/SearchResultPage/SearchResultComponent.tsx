import * as React from "react";
import {Link} from "react-router";
import {Data} from "../../data/Data";
import {FooterComponent} from "../../components/FooterComponent/";
import {SearchForm} from "../SearchForm";
import {TopMenu} from "../../components/TopMenu";
import {PageContainer} from "../../components/PageContainer";
import {SearchState} from "../../model/SearchState";
import {Pagination} from "../../components/Pagination";
import {SearchTime} from "../../components/SearchTime";
import Layout from "../../components/layout";

export function SearchResultComponent(props) {
  const {searchResult, search}: { search, searchResult: SearchState } = props;

  const head = (
    <div>
      <TopMenu/>
      <SearchForm/>
      {searchResult.success && <SearchTime
        time={searchResult.data.searchTime}
        results={searchResult.data.totalHits}
      />}
    </div>
  );

  const body = (
    <div>
      <div className="tile is-ancestor is-vertical">
        {results(searchResult.data.items, searchResult.loading, searchResult.error, searchResult.success)}
      </div>
      <Pagination
        loading={searchResult.loading || searchResult.error}
        page={searchResult.data.page}
        query={searchResult.data.query}
        total={Math.ceil(searchResult.data.totalHits / searchResult.data.pageSize)}
        onClick={(query, page) => {
          search(query, page)
        }}
      />    
    </div>
  );

  return (
    <Layout
      head={head}
      body={body}
      footer={<FooterComponent links={Data.links}/>}
    />
  );
}

function results(items, loading, error, success) {
  if (loading) {
    return (
      <div className="tile is-child box">
        <h1 className="title">Loading...</h1>
      </div>
    );
  } else if (items.length) {
    return items.map((item, index) => {
      return (
        <div key={JSON.stringify(item)} className="tile is-child box">
          <ul>
            <li>{`Type: ${item.type.toUpperCase().replace(/_/g , " ")}`}</li>
            <li>{renderByType(item.type, item.data)}</li>
          </ul>
        </div>
      );
    });
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
