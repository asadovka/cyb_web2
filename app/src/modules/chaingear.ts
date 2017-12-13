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
import streemApi from '../api/MarketStreemApi';


export const getSystemLogoUrl = function (that, CYBER_CHAINGEAR_API) {
  var icon = (that.icon ? that.icon : that.system) || '';
  icon = icon.toString().toLowerCase();
  return CYBER_CHAINGEAR_API + icon + ".png";
};

export const TIKER_INTERVAL = 1000 * 60 * 60 * 24 * 1; /*1 day*/


const addTokens = (pairs, tokens, rows, currency) => {
  const _rows = [...rows];
  pairs.forEach(symbol => {
    const item = tokens.find(t => t.token.symbol === symbol);
    console.log(' > item ', symbol, item)
    if (!item) return null;

    const existToken = _rows.find(r => r.symbol === symbol);
    if (existToken) return null;

    if (!!item && !existToken) {
      _rows.push({
          symbol: symbol,
          system: item.system,
          logo: getSystemLogoUrl(item, `${config.CYBER_CHAINGEAR_API}/logos/`),
          price: 0,
          amount: 0,
          procent: 0,
          currency
      })  
    }
  })
 console.log(' pairs ', _rows)
 
  return _rows;
}

const calcProcent = (a, b) => a === 0 ? 0 : ((a - b) / a  * 100);
const updateTokens = (rows, data) => {
  return rows
    .map(item => {
      const base = data.tokensPair.base;
      const price = data.price;
      if (item.symbol === base) {
        // console.log(item.symbol, item.price, data.price, calcProcent(item.price, data.price), data)
      }

      return item.symbol === base ? ({
        ...item,
        symbol: item.symbol,
        amount: data.quoteAmount,
        price: price,
        procent: calcProcent(item.price, price),
      }) : item;
    });   
}

const initTokens = (pairs, tokens, currency, dispatch, rows) => {
  const usdPairs = pairs.filter(item => item.quote === currency).map(item => item.base);
  return addTokens(usdPairs, tokens, rows, currency);
}


export const closeConnection = () => () => {
  streemApi.close();
}


const sorByAmmount = (rows) => [].concat(rows).sort((a, b) => b.amount - a.amount);

export const calculateRows = (state) => {
  const _rows = state.chaingear.rows;
  const rows = sorByAmmount(_rows); //SORT

  // for BTC ETH base tokens
  const BTC = 15000;
  const ETH = 400;
  return rows.map(item => {
      if (item.currency === 'BTC'){
        return {
          ...item,
          price: item.price * BTC,
          amount: item.amount * BTC
        }  
      }

      if (item.currency === 'ETH'){
        return {
          ...item,
          price: item.price * ETH,
          amount: item.amount * ETH
        }  
      }
      
      return item;
    });
}


export const showAllTokens = () => (dispatch, getState) => {
  chaingearApi.getAllTokens()
    .then(tokens => new Promise(resolve => {
        streemApi.open("ws://93.125.26.210:32801", () => {
          streemApi.getPairs(pairs => resolve({ pairs, tokens }))
        })  
      }))
    .then(({ pairs, tokens }) => {
      let rows = initTokens(pairs, tokens, 'USD', dispatch, []);
      rows = initTokens(pairs, tokens, 'USDT', dispatch, rows);
      rows = initTokens(pairs, tokens, 'BTC', dispatch, rows);
      rows = initTokens(pairs, tokens, 'ETH', dispatch, rows);

      dispatch({
        type: 'SET_TOKEN_ROWS',
        payload: rows
      });

      const pairsStr = rows.map(item => `"${item.symbol}_${item.currency}"`).join(',');
      streemApi.subscribeTickers(tiker => {
         dispatch({
          type: 'SET_TOKEN_ROWS',
          payload: updateTokens(getState().chaingear.rows, tiker)
        })
      }, pairsStr)
    })
}


export const showAllCrowdsales = () => ({
  type: 'CROWDSALES'
})


const rowsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_TOKEN_ROWS":
      return [...action.payload];    
    default:
      return state;
  }
}

export const reducer = combineReducers({
  rows: rowsReducer,
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
  loadDataEpic(
     'CROWDSALES_DETAILS',
     ({ system }) => chaingearApi.crowdsalesDetails(system)
  ),
  loadDataEpic(
     'TOKEN_DETAILS',
     ({ system }) => chaingearApi.tokensDetails(system)
  )
) 
