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
    return items.map(item => {
      return (
        <div key={item.data} className="tile is-child box">
          <ul>
            <li>{`Type: ${item.type}`}</li>
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
        <h1 className="title">Nothing found.</h1>
      </div>
    );
  }
}

function renderByType(type, data) {
  if (type === "bitcoin_block") {
    return bitcoin_block(data);
  } else if (type === "bitcoin_tx") {
    return bitcoin_tx(data);
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
        <li>{`total_outputs_value: ${data.total_outputs_value}`}</li>
        <li>{`time: ${data.time}`}</li>
        <li>{`tx_number: ${data.tx_number}`}</li>
        <li>{`hash: ${data.hash}`}</li>
        <li>{`height: ${data.height}`}</li>
      </ul>
    </div>
  );
}

function bitcoin_tx(data) {
  return (
    <div>
      <ul>
        <li>{`block_time: ${data.block_time}`}</li>
        <li>{`total_output: ${data.total_output}`}</li>
        <li>{`fee: ${data.fee}`}</li>
        <li>{`block_hash: ${data.block_hash}`}</li>
        <li>{`block_number: ${data.block_number}`}</li>
        <li>{`txid: ${data.txid}`}</li>
      </ul>
    </div>
  );
}
