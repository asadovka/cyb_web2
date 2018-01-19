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

export const calculateBuyOrders = (state, step, exchange) => {
  const buyOrders = state.tokensDetails[exchange].buyOrders;
  // const item = _.max(buyOrders, x => x.spotPrice);
  // const max = item ? item.spotPrice : 0;
  // if (!max) return [];
  const max = state.tokensDetails[exchange].bayValue;
  const oneProcent = max == 0 ? 1 :  max / 100; 

  return byInterval(buyOrders, max - (oneProcent * 20), max, oneProcent, x => x.amount * x.spotPrice).map(x => ({
    count: x.count,
    amount: x.amountSum,
    sum: x.sum,
    spotPrice: x.spotPrice
  }))
}

export const calculateBuyOrdersTotal = (state, step, exchange) => {
  const items = calculateBuyOrders(state, step, exchange);
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

export const calculateSellOrdersTotal = (state, step, exchange) => {
    const items = calculateSellOrders(state, step, exchange);
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


export const calculateSellOrders = (state, step, exchange) => {
  const sellOrders = state.tokensDetails[exchange].sellOrders
  const min = state.tokensDetails[exchange].sellValue;
  // console.log(min, min + (step * 10), step)
  const oneProcent = min == 0 ? 1 :  min / 100 ; 
 // console.log(min, )
  return byInterval(sellOrders, min, min + (oneProcent * 20), oneProcent, x => x.amount * x.spotPrice).map(x => ({
    count: x.count,
    amount: x.amountSum,
    sum: x.sum,
    spotPrice: x.spotPrice
  }))
}



const orderReducer = (type, exchange) => (state = [], action) => {
  switch (action.type) {
    case "CLEAN_ORDERS":
      return [];

    case "ADD_ORDERS": {
      let buyOrders = action.payload
        .filter(o => o.type == type && o.exchange == exchange)
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

const sellValue = exchange => (state = 0, action) => {
  switch (action.type) {
    case "ADD_TRADE": {
      const sellTrads = action.payload.filter(t => t.type === 'SELL' && t.exchange === exchange);

      if (sellTrads.length === 0) return state;

      return _.max(sellTrads, x => x.spotPrice).spotPrice;
    }
          
    default:
      return state;
  }
}

const bayValue = exchange => (state = 0, action) => {
  switch (action.type) {
    case "ADD_TRADE": {
      const sellTrads = action.payload.filter(t => t.type === 'BUY' && t.exchange === exchange);

      if (sellTrads.length === 0) return state;

      return _.max(sellTrads, x => x.spotPrice).spotPrice;
    }
          
    default:
      return state;
  }
}

export const getLinksByTag = (data, tag, splice = -1) => {
  if (!data.links || !_.isArray(data.links)) {
    return [];
  }

  const links = data.links.filter(function(link) {
    return (link.tags && _.isArray(link.tags) && link.tags.indexOf(tag) > -1);
  })

  if (splice === -1) return links;

  return links.splice(0, splice)
}

const avgPriceChart = (state = [], action) => {
  switch (action.type) {
    case "SET_AVG_PRICE_CHART":
      return action.payload;
    
    default:
      return state;
  }
}

const multiPriceChart = (state = [], action) => {
  switch (action.type) {
    case "SET_MULTI_PRICE_CHART":
      return action.payload;
    
    default:
      return state;
  }
}



export const getMultiPriceChart = (state) => {
  const multiPriceChart = state.tokensDetails.multiPriceChart;
  const result = [];
  for(let key in multiPriceChart) {
    for(let i = 0; i < multiPriceChart[key].length; i++) {
      if (i < result.length) {
        result[i][key] = multiPriceChart[key][i].close;
      } else {
        result.push({
          time: multiPriceChart[key][i].time,
          [key]: multiPriceChart[key][i].close
        })
      }
    }
  }
  return result;
}

export const getExchanges = (state) => {
  const multiPriceChart = state.tokensDetails.multiPriceChart;
  return Object.keys(multiPriceChart);
}

export const reducer = combineReducers({
  avgPriceChart,
  multiPriceChart,
  tokensDetails: createDateReducer('TOKEN_DETAILS'),
  // tokensPriceChartGDAX: createDateReducer('TOKEN_DETAILS_CHART_GDAX'),
  // tokensPriceChartHitBtc: createDateReducer('TOKEN_DETAILS_CHART_HitBtc'),
  // tokensPriceChart: createDateReducer('TOKEN_DETAILS_CHART'),
  trades,
  HitBtc: combineReducers({
    buyOrders: orderReducer('BUY', 'HitBtc'),
    sellOrders: orderReducer('SELL', 'HitBtc'),
    sellValue: sellValue('HitBtc'),
    bayValue: bayValue('HitBtc')    
  }),
  GDAX: combineReducers({
    buyOrders: orderReducer('BUY', 'GDAX'),
    sellOrders: orderReducer('SELL', 'GDAX'),
    sellValue: sellValue('GDAX'),
    bayValue: bayValue('GDAX')    
  })
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

  marketApi.getHistoMinute(symbol, base)
    .then(responce => {
      const payload = responce.data.reverse().map(item => ({
        time: item.time,
        price: item.close
      }))
      dispatch({
        type: 'SET_AVG_PRICE_CHART',
        payload
      })
    })

  const exchanges = [
    "Bitstamp",  
    "Bitfinex",
    "Etherdelta",  
    "GDAX",
    "HitBtc",
    "Poloniex"
  ];

  const data = {

  };
  const promises = exchanges.map(e => {
    return marketApi.getHistoMinute(symbol, base, 1, e)
      .then(response => {
        data[e] = response.data.reverse();
        return response.data.reverse();
      })
      .catch(err => {

      }) 
  })

  Promise.all(promises).then(response => {
    dispatch({
      type: 'SET_MULTI_PRICE_CHART',
      payload: data
    })
  })
  
  // SET_AVG_PRICE_CHART

  // dispatch({
  //   type: 'TOKEN_DETAILS_CHART',
  //   payload: { symbol, base } 
  // })

  // dispatch({
  //   type: 'TOKEN_DETAILS_CHART_GDAX',
  //   payload: { symbol, base } 
  // })

  // dispatch({
  //   type: 'TOKEN_DETAILS_CHART_HitBtc',
  //   payload: { symbol, base } 
  // })

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
  // loadDataEpic(
  //   'TOKEN_DETAILS_CHART',
  //   ({ symbol, base }) => marketApi.getHistoHour(symbol, base)
  // ),
  // loadDataEpic(
  //   'TOKEN_DETAILS_CHART_GDAX',
  //   ({ symbol, base }) => marketApi.getHistoHour(symbol, base, 1, 'GDAX')
  // ),
  // loadDataEpic(
  //   'TOKEN_DETAILS_CHART_HitBtc',
  //   ({ symbol, base }) => marketApi.getHistoHour(symbol, base, 1, 'HitBtc')
  // ),
  loadDataEpic(
     'TOKEN_DETAILS',
     ({ symbol }) => chaingearApi.tokensDetails(symbol)
  )
) 
