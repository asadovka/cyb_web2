import {Injector} from "../../injector";
import {Observable} from "rxjs";
import {combineReducers} from "redux";
import {combineEpics} from "redux-observable";

import { createDateReducer, mapPayload, mapError, loadDataEpic } from '../../utils/redux'

const {
  chaingearApi,
  marketApi
} = Injector.of();

var config = require('./config.js')

const {
  http
} = Injector.of();
import streemApi from '../../api/MarketStreemApi';


export const showAllCrowdsales = () => ({
  type: 'CROWDSALES'
})


const trades = (state = [], action) => {
  switch (action.type) {
    case "ADD_TRADE":{
       // return state.concat([action.payload]);
      const arr = state.concat(action.payload);
      return arr.slice(-10)    
    }
    case "SET_TRADE":
      return [...state, ...action.payload];    
    default:
      return state;
  }
}



import _ from 'lodash';

function byInterval(arr, min, max, step, sumBy) {
      const result = [];
      for(var i = min; i <= max; i+=step) {
        const items = arr.filter((x) => x.spotPrice >= i && x.spotPrice < i + step);
        const sum = items.reduce((a, b) => a + sumBy(b), 0);
        const amountSum = items.reduce((a, b) => a + b.amount, 0);
        const count = items.length;
        result.push({
          spotPrice : i,
          count: count,
          sum: sum,
          amountSum: amountSum
        })
      }
   return result;
}

export const calculateBuyOrders = (state, step) => {
  const buyOrders = state.tokensDetails.buyOrders;
  // const item = _.max(buyOrders, x => x.spotPrice);
  // const max = item ? item.spotPrice : 0;
  // if (!max) return [];
  const max = state.tokensDetails.bayValue;

  return byInterval(buyOrders, max - (step * 10), max, step, x => x.amount * x.spotPrice).map(x => ({
    count: x.count,
    amount: x.amountSum,
    sum: x.sum,
    spotPrice: x.spotPrice
  }))
}

export const calculateBuyOrdersTotal = (state, step) => {
  const items = calculateBuyOrders(state, step);
  const gbuyTotal = [];  
  for(var i = 0; i < items.length; i++) {
    const buy = items.reduce((a, b, index) => index >= i ? a + b.sum : a, 0);
    gbuyTotal.push({
      count: items[i].count,
      spotPrice: items[i].spotPrice,
      sum: items[i].sum,
      amount: items[i].amount,
      buy: buy
    })
  }
  return gbuyTotal;
}

export const calculateSellOrdersTotal = (state, step) => {
    const items = calculateSellOrders(state, step);
    const gsellTotal = [];      
    for(var i = 0; i < items.length; i++) {
      const sell = items.reduce((a, b, index) => index <= i ? a + b.sum : a, 0);
      
      gsellTotal.push({
        count: items[i].count,
        spotPrice: items[i].spotPrice,
        sum: items[i].sum,
        amount: items[i].amount,
        sell: sell
      })
    }
    return gsellTotal;
}


export const calculateSellOrders = (state, step) => {
  const sellOrders = state.tokensDetails.sellOrders
  const min = state.tokensDetails.sellValue;

  return byInterval(sellOrders, min, min + (step * 10), step, x => x.amount * x.spotPrice).map(x => ({
    count: x.count,
    amount: x.amountSum,
    sum: x.sum,
    spotPrice: x.spotPrice
  }))
}



const orderReducer = type => (state = [], action) => {
  switch (action.type) {
    case "CLEAN_ORDERS":
      return [];

    case "ADD_ORDERS": {
      let buyOrders = action.payload
        .filter(o => o.type == type )
        .map(item => ({ ...item, count: 1}));

      return state.concat(buyOrders);
    }

    default:
      return state;
  }
}

export const closeConnection = () => () => {
  streemApi.close();
}

const sellValue = (state = 0, action) => {
  switch (action.type) {
    case "ADD_TRADE": {
      const sellTrads = action.payload.filter(t => t.type === 'SELL');

      if (sellTrads.length === 0) return state;

      return _.max(sellTrads, x => x.spotPrice).spotPrice;
    }
          
    default:
      return state;
  }
}

const bayValue = (state = 0, action) => {
  switch (action.type) {
    case "ADD_TRADE": {
      const sellTrads = action.payload.filter(t => t.type === 'BUY');

      if (sellTrads.length === 0) return state;

      return _.max(sellTrads, x => x.spotPrice).spotPrice;
    }
          
    default:
      return state;
  }
}

export const reducer = combineReducers({
  tokensDetails: createDateReducer('TOKEN_DETAILS'),
  tokensPriceChart: createDateReducer('TOKEN_DETAILS_CHART'),
  trades,
  buyOrders: orderReducer('BUY'),
  sellOrders: orderReducer('SELL'),
  sellValue,
  bayValue
})

export const showCrowdsalesDetails = (system) => ({
  type: 'CROWDSALES_DETAILS',
  payload: { system }
})


let _trades = [];
const updateTrades = _.throttle((dispatch) => {
  dispatch({
    type: 'ADD_TRADE',
    payload: _trades
  });
  _trades = [];
}, 1000)

let _orders = [];
const updateOrders = _.throttle(dispatch => {
  dispatch({
    type: 'ADD_ORDERS',
    payload: _orders
  })
  _orders= [];
}, 1000);

export const showTokensDetails = (symbol, base) => (dispatch, getState) => {
  dispatch({
    type: 'TOKEN_DETAILS',
    payload: { symbol }  
  })
  dispatch({
    type: 'TOKEN_DETAILS_CHART',
    payload: { symbol, base } 
  })

  streemApi.open(config.CYBER_MARKETS_STREAM_API, () => {
    streemApi.subscribeTrades(trade => {
      if (Array.isArray(trade)) {
        dispatch({
          type: 'SET_TRADE',
          payload: trade
        })
      } else {
        _trades = _trades.concat([trade]);

        updateTrades(dispatch)
        
      }
    }, `"${symbol}_${base}"`);

    dispatch({ type: 'CLEAN_ORDERS' })
    streemApi.subscribeOrders(order => {
      _orders = _orders.concat(order);
      updateOrders(dispatch);

    }, `"${symbol}_${base}"`)
  })  
}


export const epic = combineEpics(
  loadDataEpic(
    'TOKEN_DETAILS_CHART',
    ({ symbol, base }) => marketApi.getHistoHour(symbol, base)
  ),
  loadDataEpic(
     'TOKEN_DETAILS',
     ({ symbol }) => chaingearApi.tokensDetails(symbol)
  )
) 
