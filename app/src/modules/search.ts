import {CfActions} from "../actions/CfActions";

import {FULFILLED, REJECTED} from "../actions/ActionsUtils";
import {mapAndDispatchError, mapAndDispatchPayload } from "../epics/EpicsUtils";

import {Injector} from "../injector";
const {
  searchApi
} = Injector.of();

export const search = (query, page, coins, type) => (dispatch, getStore) => {
  dispatch({ type: CfActions.SEARCH, payload: {query, page} });
  searchApi.search(query, page, coins, type)
    .then(mapAndDispatchPayload(CfActions.SEARCH, dispatch))
    .catch(mapAndDispatchError(CfActions.SEARCH, dispatch))
}

export const getBitcoinTx = (txId) => (dispatch) => {
  dispatch({
    type: CfActions.GET_BITCOIN_TX,
    payload: {txId}
  });
} 

export const getBitcoinBlock = (blockNumber) => (dispatch) => {
  dispatch({
    type: CfActions.GET_BITCOIN_BLOCK,
    payload: {blockNumber}
  });
}

export const getEthereumBlock = (blockNumber) => (dispatch) => {
  dispatch({
    type: CfActions.GET_ETHEREUM_BLOCK,
    payload: {blockNumber}
  });
}

export const getEthereumTx = (txHash) => (dispatch) => {
  dispatch({
    type: CfActions.GET_ETHEREUM_TX,
    payload: {txHash}
  });
}
