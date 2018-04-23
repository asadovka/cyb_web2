const CfActions = {
  SEARCH: "SEARCH",
  GET_BITCOIN_BLOCK: "GET_BITCOIN_BLOCK",
  GET_BITCOIN_TX: "GET_BITCOIN_TX",
  GET_ETHEREUM_BLOCK: "GET_ETHEREUM_BLOCK",
  GET_ETHEREUM_TX: "GET_ETHEREUM_TX",
  GET_STATISTICS: "GET_STATISTICS"
};

import {combineReducers} from "redux";
import {combineEpics} from "redux-observable";
import moment from 'moment'

import {Injector} from "../injector";
const {
  searchApi,
  http
} = Injector.of();

import { createDateReducer, mapPayload, mapError, loadDataEpic, ItemsReducer } from '../utils/redux'

const EthereumUSDPrice = (state = 0, action) => {
  switch (action.type) {
    case "SET_ETH_USD_PRICE_BY_DATE":
      return action.payload;    
    default:
      return state;
  }
}

const Field = (name, initState) => (state = initState, action) => {
  switch (action.type) {
    case `SET_${name}`:
      return action.payload;    
    default:
      return state;
  }
}

export const reducer = combineReducers({
  searchResults: ItemsReducer('SEARCH'),

  bitcoinBlock: createDateReducer(CfActions.GET_BITCOIN_BLOCK),
  bitcoinTx: createDateReducer(CfActions.GET_BITCOIN_TX),


  bitcoinCashBlock: createDateReducer('GET_BITCOIN_CASH_BLOCK'),
  bitcoinCashTx: createDateReducer('GET_BITCOIN_CASH_TX'),


  ethereumBlock: createDateReducer(CfActions.GET_ETHEREUM_BLOCK),
  ethereumTx: createDateReducer(CfActions.GET_ETHEREUM_TX),
  ethereumTxs: createDateReducer('GET_ETHEREUM_BLOCK_TRANSACTIONS', []),
  eth_usd_price_on_date: Field('ETH_USD_PRICE_BY_DATE', 0),
  timeAfterPreviosBlock: Field('TIME_PREV_BLOCK', 0),

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


export const getEthereumBlock = (blockNumber) => (dispatch) => {
  dispatch({
    type: CfActions.GET_ETHEREUM_BLOCK,
    payload: {blockNumber}
  })

  searchApi.getEthereumBlock(blockNumber)
    .then(data => {
      dispatch({
        type: CfActions.GET_ETHEREUM_BLOCK + '_FULFILLED',
        payload: data
      })


      searchApi.getEthereumBlock((+blockNumber) - 1)
        .then(prevBlock => {
          dispatch({
            type: 'SET_TIME_PREV_BLOCK',
            payload: moment(data.timestamp * 1000).from(prevBlock.timestamp * 1000)
          })
        })

      return http.GET(
        `https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=${data.timestamp}`
      )
    }).then(response => {
      dispatch({
        type: 'SET_ETH_USD_PRICE_BY_DATE',
        payload: response.ETH.USD
      })
    })

  //     dispatch({
  //       type: CfActions.GET_ETHEREUM_BLOCK + '_FULFILLED',
  //       payload: {
  //         number: 1000000,
  //         timestamp: (+new Date()) / 1000,
  //         hash: '0x4ac3f539f2cd2aae120f210bdc6cf48f144a987fa144d5c0a2ca9ce0fb3f9e30',
  //         sha3_uncles: '0x48bc95d97ca9dbd8ac76952c1da8a3a0d5f5c97333aaeb824aeaf878a168d85b',
  //         size: 19468,
  //         extra_data: 'ethermine-asia5 (Hex:0x65746865726d696e652d6173696135)',
  //         miner: '0xea674fdde714fd979de3edf0f56aa9716b898ec8',
  //         difficulty: 2688424261153540,
  //         block_reward: '5',
  //         tx_fees: '0.01',
  //         gas_used: 80000,
  //         gas_limit: 83400,
  //         tx_number: 2
  //       }
  //     })


  searchApi.getEthereumTxsByBlockNumber(blockNumber, 1, 3)
    .then(data => {
      dispatch({
        type: 'GET_ETHEREUM_BLOCK_TRANSACTIONS_FULFILLED',
        payload: data
      })
    })
}

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


export const getEthereumAddress = (hash) => () => {

}

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
}

export const epic = combineEpics(
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
