import {CfActions} from "../actions/CfActions";
import {combineReducers} from "redux";
import {combineEpics} from "redux-observable";

import {FULFILLED, REJECTED} from "../actions/ActionsUtils";

import {Injector} from "../injector";
const {
  searchApi,
  http
} = Injector.of();

import { createDateReducer, mapPayload, mapError, loadDataEpic, ItemsReducer } from '../utils/redux'


export const reducer = combineReducers({
  searchResults: ItemsReducer('SEARCH'),

  bitcoinBlock: createDateReducer(CfActions.GET_BITCOIN_BLOCK),
  bitcoinTx: createDateReducer(CfActions.GET_BITCOIN_TX),


  bitcoinCashBlock: createDateReducer('GET_BITCOIN_CASH_BLOCK'),
  bitcoinCashTx: createDateReducer('GET_BITCOIN_CASH_TX'),


  ethereumBlock: createDateReducer(CfActions.GET_ETHEREUM_BLOCK),
  ethereumTx: createDateReducer(CfActions.GET_ETHEREUM_TX),

  ethereumClassicBlock: createDateReducer('GET_ETHEREUM_CLASSIC_BLOCK'),
  ethereumClassicTx: createDateReducer('GET_ETHEREUM_CLASSIC_TX'),
})



export const showMore = ({ query, page, chains, entities }) => (dispatch, getState) => {
   const next_page = getState().search.searchResults.page;
   searchApi.search(query, next_page, chains, entities, 10)
     .then(data => {
       dispatch({
         type: 'SEARCH_FULFILLED_MORE',
         payload: data
       });
     })
}

export const search = (query, page, chains, entities, pageSize = 10) => ({
  type: 'SEARCH',
  payload: { query, page, chains, entities, pageSize }
})

const searchItems = loadDataEpic(
  'SEARCH',
  ({ query, page, chains, entities, pageSize }) => searchApi.search(query, page, chains, entities, pageSize)
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


export const getBitcoinCashTx = (txId) => ({
  type: 'GET_BITCOIN_CASH_TX',
  payload: {txId}
});

const getBitcoinCashTxEpic = loadDataEpic(
  'GET_BITCOIN_CASH_TX',
  ({txId}) => searchApi.getBitcoinCashTx(txId)
)

export const getBitcoinCashBlock = (blockNumber) => ({
  type: 'GET_BITCOIN_CASH_BLOCK',
  payload: {blockNumber}
})

const getBitcoinCashBlockEpic = loadDataEpic(
  'GET_BITCOIN_CASH_BLOCK',
  ({blockNumber}) => searchApi.getBitcoinCashBlock(blockNumber)
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


export const getEthereumClassicBlock = (blockNumber) => ({
  type: 'GET_ETHEREUM_CLASSIC_BLOCK',
  payload: {blockNumber}
})

const getEthereumClassicBlockEpic = loadDataEpic(
  'GET_ETHEREUM_CLASSIC_BLOCK',
  ({ blockNumber }) => searchApi.getEthereumClassicBlock(blockNumber)
)


export const getEthereumClassicTx = (txHash) => ({
  type: 'GET_ETHEREUM_CLASSIC_TX',
  payload: {txHash}
})

const getEthereumClassicTxEpic = loadDataEpic(
  'GET_ETHEREUM_CLASSIC_TX',
  ({txHash}) => searchApi.getEthereumClassicTx(txHash)
);

export const getStatistics = () => (dispatch) => {
  dispatch({ type: CfActions.GET_STATISTICS })
  // Promise.all([
  //   http.GET('https://api.coinmarketcap.com/v1/ticker/bitcoin/'),
  //   http.GET('https://api.coinmarketcap.com/v1/global/?convert=EUR')
  // ]).then((data: any) => {
  //   console.log(' >> ', data)
  //   dispatch({
  //     type: CfActions.GET_STATISTICS + '_FULFILLED',
  //     payload: {
  //       total_24h_volume_usd: data[1].total_24h_volume_usd,
  //       total_24h_volume_bit: data[1].total_24h_volume_usd / data[0][0].price_usd
  //     }
  //   })
  // });
}

export const searchEpic = combineEpics(
  searchItems,
  
  getBitcoinBlockEpic,
  getBitcoinTxEpic,
  
  getEthereumBlockEpic,
  getEthereumTxEpic,
  
  getBitcoinCashTxEpic,
  getBitcoinCashBlockEpic,

  getEthereumClassicTxEpic,
  getEthereumClassicBlockEpic
);
