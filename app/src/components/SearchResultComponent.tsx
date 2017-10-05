import * as React from "react";
import {Link} from "react-router";
import {Data} from "../data/Data";
import {FooterComponent} from "./FooterComponent";
import {SearchForm} from "../containers/SearchForm";
import {TopMenu} from "./TopMenu";
import {PageContainer} from "./PageContainer";
import {SearchResponse} from "../actions/CfActions";
import {SearchState} from "../model/SearchState";

export function SearchResultComponent(props) {
  const {searchResult}: { searchResult: SearchState } = props;

  return (
    <PageContainer>

      <div className="hero is-fullheight">
        <div className="hero-head">
          <TopMenu/>
          <SearchForm/>
        </div>

        <div className="hero-body">
          <div className="container">
            <div className="tile is-ancestor is-vertical">
              {results(searchResult.data.items, searchResult.loading, searchResult.error, searchResult.success)}
            </div>
          </div>
        </div>

        <div className="hero-footer">
          <FooterComponent links={Data.links}/>
        </div>
      </div>

    </PageContainer>
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
        <div key={index} className="tile is-child box">
          <ul>
            <li>{`Type: ${item.type.toUpperCase().replace(/_/g , " ")}`}</li>
            <li>{`Data: `}{renderByType(item.type, item.data)}</li>
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
        <h1 className="title">Nothing found in cyber•Space.</h1>
      </div>
    );
  }
}

function renderByType(type, data) {
  if (type === "bitcoin_block") {
    return bitcoin_block(data);
  } else if (type === "bitcoin_tx") {
    return bitcoin_tx(data);
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
    </div>
  );
}
