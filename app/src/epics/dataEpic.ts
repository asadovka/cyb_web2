import {combineEpics} from "redux-observable";
import {Observable} from "rxjs";
import {Store} from "redux";
import {CfAction} from "../actions/CfAction";
import {mapError, mapPayload} from "./EpicsUtils";
import {Injector} from "../injector";
import {CfActions, SearchPayload, SearchResponse} from "../actions/CfActions";
import {CfState} from "../model/CfState";

export const dataEpic = combineEpics(
  createGetBitcoinBlockEpic(CfActions.GET_BITCOIN_BLOCK),
  createGetBitcoinTxEpic(CfActions.GET_BITCOIN_TX),
  createGetEthereumBlockEpic(CfActions.GET_ETHEREUM_BLOCK),
  createGetEthereumTxEpic(CfActions.GET_ETHEREUM_TX)
);

const {
  dataApi
} = Injector.of();

function createGetBitcoinBlockEpic(actionType) {
  return (action$, store: Store<CfState>) => action$
    .ofType(actionType)
    .mergeMap(({payload: {blockNumber}}: CfAction<{ blockNumber: string }>) => {
      return Observable
        .fromPromise(dataApi.getBitcoinBlock(blockNumber))
        .map(mapPayload(actionType))
        .catch(mapError(actionType));
    });
}

function createGetBitcoinTxEpic(actionType) {
  return (action$, store: Store<CfState>) => action$
    .ofType(actionType)
    .mergeMap(({payload: {txId}}: CfAction<{ txId: string }>) => {
      return Observable
        .fromPromise(dataApi.getBitcoinTx(txId))
        .map(mapPayload(actionType))
        .catch(mapError(actionType));
    });
}

function createGetEthereumBlockEpic(actionType) {
  return (action$, store: Store<CfState>) => action$
    .ofType(actionType)
    .mergeMap(({payload: {blockNumber}}: CfAction<{ blockNumber: string }>) => {
      return Observable
        .fromPromise(dataApi.getEthereumBlock(blockNumber))
        .map(mapPayload(actionType))
        .catch(mapError(actionType));
    });
}

function createGetEthereumTxEpic(actionType) {
  return (action$, store: Store<CfState>) => action$
    .ofType(actionType)
    .mergeMap(({payload: {txHash}}: CfAction<{ txHash: string }>) => {
      return Observable
        .fromPromise(dataApi.getEthereumTx(txHash))
        .map(mapPayload(actionType))
        .catch(mapError(actionType));
    });
}
