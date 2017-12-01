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


export const TIKER_INTERVAL = 1000 * 60 * 60 * 24 * 1; /*1 day*/


export const reducer = combineReducers({
  tokens: createDateReducer('TOKENS', { tokens: [], statistics: [] }),
  crowdsales: createDateReducer('CROWDSALES', [])
})

export const getSystemLogoUrl = function (that, CYBER_CHAINGEAR_API) {
  var icon = (that.icon ? that.icon : that.system) || '';
  icon = icon.toString().toLowerCase();
  return CYBER_CHAINGEAR_API + icon + ".png";
};


export const showAllTokens = () => ({
  type: 'TOKENS'
})

const loadCrowdsales = loadDataEpic(
  'CROWDSALES',
  () => chaingearApi.getAllCrowdsales()
);


export const showAllCrowdsales = () => ({
  type: 'CROWDSALES'
})

const loadTokens = loadDataEpic(
  'TOKENS', 
  () => Promise.all([
    chaingearApi.getAllTokens(), 
    marketApi.getTokensStatistics()
  ]),
  data => ({
    tokens: data[0],
    statistics: data[1]
  })
);

export const chaingearEpic = combineEpics(
  loadCrowdsales,
  loadTokens
) 
