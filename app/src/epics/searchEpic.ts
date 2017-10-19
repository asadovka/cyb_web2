import {combineEpics} from "redux-observable";
import {Observable} from "rxjs";
import {Store} from "redux";
import {CfAction} from "../actions/CfAction";
import {mapError, mapPayload} from "./EpicsUtils";
import {Injector} from "../injector";
import {CfActions, SearchPayload, SearchResponse} from "../actions/CfActions";
import {CfState} from "../model/CfState";

export const searchEpic = combineEpics(
  createSearchEpic(CfActions.SEARCH)
);

const {
  searchApi
} = Injector.of();

function createSearchEpic(actionType) {
  return (action$, store: Store<CfState>) => action$
    .ofType(actionType)
    .mergeMap(({payload: {query, page}}: CfAction<SearchPayload>) => {
      return Observable
        .fromPromise(searchApi.search(query, page))
        .map(mapPayload(actionType))
        .catch(mapError(actionType));
    });
}
