import {Injector} from "../injector";
import {Observable} from "rxjs";
import {combineReducers} from "redux";

const {
  chaingearApi,
  marketApi
} = Injector.of();

var config = require('./config.js')

const {
  http
} = Injector.of();

const initState = {
  tokens: [],
  statistics: []
};

export const TIKER_INTERVAL = 1000 * 60 * 60 * 24 * 1; /*1 day*/

const tokensReducer = (state = initState, action) => {
  switch (action.type) {
     case 'SET_TOKENS':
       return {
         ...state,
         tokens: action.payload.tokens,
         statistics: action.payload.statistics
       }
    default:
      return state;
  }
}

const createDateReducerInitState = (initData) => ({
  success: false,
  error: false,
  loading: true,
  data: initData
});

const createDateReducer = (type, initData = {}) => (state = createDateReducerInitState(initData), action) => {
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

const mapPayload = type => data => ({
    type: `${type}_FULFILLED`,
    payload: data
})

const mapError = type => () => ({
  type: `${type}_REJECTED`
})


export const reducer = combineReducers({
  tokens: tokensReducer,
  crowdsales: createDateReducer('CROWDSALES', [])
})

export const getSystemLogoUrl = function (that, CYBER_CHAINGEAR_API) {
  var icon = (that.icon ? that.icon : that.system) || '';
  icon = icon.toString().toLowerCase();
  return CYBER_CHAINGEAR_API + icon + ".png";
};


export const showAllTokens = () => (dispatch, getState) => {
  Promise.all([
    chaingearApi.getAllTokens(), 
    marketApi.getTokensStatistics()
  ]).then(data => {
    dispatch({
      type: 'SET_TOKENS',
      payload: {
        tokens: data[0],
        statistics: data[1]
      }
    })
  })
}


export const showAllCrowdsales = () => ({
  type: 'SHOW_ALL_CROWDSALES'
})


export const chaingearEpic = action$ =>
  action$
    .ofType('SHOW_ALL_CROWDSALES')
    .mergeMap(() => Observable
      .fromPromise(chaingearApi.getAllCrowdsales())
    )
    .map(mapPayload('CROWDSALES'))
    .catch(mapError('CROWDSALES'));
