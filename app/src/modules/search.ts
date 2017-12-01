import {CfActions} from "../actions/CfActions";
import {combineReducers} from "redux";
import {combineEpics} from "redux-observable";

import {FULFILLED, REJECTED} from "../actions/ActionsUtils";

import {Injector} from "../injector";
const {
  searchApi,
  http
} = Injector.of();

import { createDateReducer, mapPayload, mapError, loadDataEpic } from '../utils/redux'


export const reducer = combineReducers({
  searchResults: createDateReducer('SEARCH'),
  bitcoinBlock: createDateReducer(CfActions.GET_BITCOIN_BLOCK),
  bitcoinTx: createDateReducer(CfActions.GET_BITCOIN_TX),
  ethereumBlock: createDateReducer(CfActions.GET_ETHEREUM_BLOCK),
  ethereumTx: createDateReducer(CfActions.GET_ETHEREUM_TX)
})

export const search = (query, page, coins, type) => ({
  type: 'SEARCH',
  payload: { query, page, coins, type }
})

const searchItems = loadDataEpic(
  'SEARCH',
  ({ query, page, coins, type }) => searchApi.search(query, page, coins, type)
)



export const getBitcoinBlock = (blockNumber) => ({
  type: CfActions.GET_BITCOIN_BLOCK,
  payload: {blockNumber}
})

const getBitcoinBlockEpic = loadDataEpic(
  CfActions.GET_BITCOIN_BLOCK,
  ({blockNumber}) => searchApi.getBitcoinBlock(blockNumber)
)


export const getBitcoinTx = (txId) => ({
  type: CfActions.GET_BITCOIN_TX,
  payload: {txId}
});

const getBitcoinTxEpic = loadDataEpic(
  CfActions.GET_BITCOIN_TX,
  ({txId}) => searchApi.getBitcoinTx(txId)
)

export const getEthereumBlock = (blockNumber) => ({
  type: CfActions.GET_ETHEREUM_BLOCK,
  payload: {blockNumber}
})

const getEthereumBlockEpic = loadDataEpic(
  CfActions.GET_ETHEREUM_BLOCK,
  ({ blockNumber }) => searchApi.getEthereumBlock(blockNumber)
)

export const getEthereumTx = (txHash) => ({
  type: CfActions.GET_ETHEREUM_TX,
  payload: {txHash}
})

const getEthereumTxEpic = loadDataEpic(
  CfActions.GET_ETHEREUM_TX,
  ({txHash}) => searchApi.getEthereumTx(txHash)
);

export const getStatistics = () => (dispatch) => {
  dispatch({ type: CfActions.GET_STATISTICS })
  Promise.all([
    http.GET('https://api.coinmarketcap.com/v1/ticker/bitcoin/'),
    http.GET('https://api.coinmarketcap.com/v1/global/?convert=EUR')
  ]).then((data: any) => {
    console.log(' >> ', data)
    dispatch({
      type: CfActions.GET_STATISTICS + '_FULFILLED',
      payload: {
        total_24h_volume_usd: data[1].total_24h_volume_usd,
        total_24h_volume_bit: data[1].total_24h_volume_usd / data[0][0].price_usd
      }
    })
  });
}

export const searchEpic = combineEpics(
  searchItems,
  getBitcoinBlockEpic,
  getBitcoinTxEpic,
  getEthereumBlockEpic,
  getEthereumTxEpic
);
