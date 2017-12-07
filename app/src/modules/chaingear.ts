import {Injector} from "../injector";
import {Observable} from "rxjs";
import {combineReducers} from "redux";
import {combineEpics} from "redux-observable";

import { createDateReducer, mapPayload, mapError, loadDataEpic } from '../utils/redux'

const {
  chaingearApi,
  marketApi
} = Injector.of();

var config = require('./config.js')

const {
  http
} = Injector.of();


export const getSystemLogoUrl = function (that, CYBER_CHAINGEAR_API) {
  var icon = (that.icon ? that.icon : that.system) || '';
  icon = icon.toString().toLowerCase();
  return CYBER_CHAINGEAR_API + icon + ".png";
};

export const TIKER_INTERVAL = 1000 * 60 * 60 * 24 * 1; /*1 day*/


export const showAllTokens = () => (dispathc, getState) => {
  dispathc({ type: 'TOKENS' })
  return Promise.all([
    chaingearApi.getAllTokens(), 
    marketApi.getTokensStatistics()
  ]).then(data => {
    dispathc({
      type: 'TOKENS_FULFILLED',
      payload: {
        tokens: data[0],
        statistics: data[1]
      }
    })
  })
}

// ({
//   type: 'TOKENS'
// })

export const showAllCrowdsales = () => ({
  type: 'CROWDSALES'
})


export const reducer = combineReducers({
  tokens: createDateReducer('TOKENS', { tokens: [], statistics: [] }),
  crowdsales: createDateReducer('CROWDSALES', []),
  crowdsalesDetails: createDateReducer('CROWDSALES_DETAILS'),
  tokensDetails: createDateReducer('TOKEN_DETAILS')
})

export const showCrowdsalesDetails = (system) => ({
  type: 'CROWDSALES_DETAILS',
  payload: { system }
})

export const showTokensDetails = (system) => ({
  type: 'TOKEN_DETAILS',
  payload: { system }  
})


export const chaingearEpic = combineEpics(
  loadDataEpic(
    'CROWDSALES',
    () => chaingearApi.getAllCrowdsales()
  ),
  // loadDataEpic(
  //   'TOKENS', 
  //   () => Promise.all([
  //     chaingearApi.getAllTokens(), 
  //     marketApi.getTokensStatistics()
  //   ]),
  //   data => ({
  //     tokens: data[0],
  //     statistics: data[1]
  //   })
  // ),
  loadDataEpic(
     'CROWDSALES_DETAILS',
     ({ system }) => chaingearApi.crowdsalesDetails(system)
  ),
  loadDataEpic(
     'TOKEN_DETAILS',
     ({ system }) => chaingearApi.tokensDetails(system)
  )
) 
