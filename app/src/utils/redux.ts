import {Observable} from "rxjs";


const createDateReducerInitState = (initData) => ({
  success: false,
  error: false,
  loading: true,
  data: initData
});

export const createDateReducer = (type, initData = {}) => (state = createDateReducerInitState(initData), action) => {
  switch (action.type) {
    case type:
      return {
        success: false,
        error: false,
        loading: true,
        data: initData
      };
    case `${type}_FULFILLED`: 
      return {
        success: true,
        error: false,
        loading: false,
        data: action.payload
      };
    case `${type}_REJECTED`:
      return {
        success: false,
        error: true,
        loading: false,
        data: {}
      };
    default:
      return state;
  }
}

export const mapPayload = (type, mapData) => data => ({
    type: `${type}_FULFILLED`,
    payload: mapData(data)
})

export const mapError = type => () => ({
  type: `${type}_REJECTED`
})

const defaultMapData = (data) => data;

export const loadDataEpic = (actionType, promise, mapData = defaultMapData) => action$ =>
  action$
    .ofType(actionType)
    .mergeMap((data) => Observable
      .fromPromise(promise(data.payload))
    )
    .map(mapPayload(actionType, mapData))
    .catch(mapError(actionType));
