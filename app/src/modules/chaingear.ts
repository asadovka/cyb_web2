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
    // console.log(' > item ', symbol, item)
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
 console.log(' init rows ', _rows)
 
  return _rows;
}

const calcProcent = (a, b) => a === 0 ? 0 : ((a - b) / a  * 100);
const updateTokens = (rows, data, map) => {
  // console.log(' data ', data)
  return rows
    .map(item => {
      const { base, price } = map(data);

      const update = item.symbol === base;

      return update ? ({
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


export const calculateExchangeRate = (state) => state.chaingear.exchangeRate;

export const calculateRows = (state) => {

  const _rows = state.chaingear.rows.filter(row => row.price > 0);
  const rows = sorByAmmount(_rows); //SORT
  const { btc_usd, eth_usd } = state.chaingear.exchangeRate;

  return rows.map(item => {
      if (item.currency === 'BTC'){
        return {
          ...item,
          price: item.price * btc_usd,
          amount: item.amount * btc_usd
        }  
      }

      if (item.currency === 'ETH'){
        return {
          ...item,
          price: item.price * eth_usd,
          amount: item.amount * eth_usd
        }  
      }
      
      return item;
    });
}



const updateRate = (data, dispatch, map) => {
  const btc_usd = data.find(row => map(row).base === 'BTC');
  if (btc_usd) {
    dispatch({
      type: 'CHANGE_EXCHANGE_RATE_BTC',
      payload: map(btc_usd).price
    })
  }

  const eth_usd = data.find(row => map(row).base === 'ETH');
  if (eth_usd) {
    dispatch({
      type: 'CHANGE_EXCHANGE_RATE_ETH',
      payload: map(eth_usd).price
    })
  }
}

export const showAllTokens = () => (dispatch, getState) => {
  chaingearApi.getAllTokens()
    .then(tokens => new Promise(resolve => {
        streemApi.open(config.CYBER_MARKETS_STREAM_API, () => {
          streemApi.getPairs(pairs => resolve({ pairs, tokens }))
        })  
        // streemApi.open("ws://93.125.26.210:32801", () => {
        //   resolve({ //
        //     pairs: [{ base: 'DOGE', quote: 'BTC'}],
        //     tokens
        // })
        // });
      }))
    .then(({ pairs, tokens }) => {
      console.log('pairs>', pairs)
      let rows = [];
      rows = initTokens(pairs, tokens, 'USD', dispatch, rows);
      rows = initTokens(pairs, tokens, 'USDT', dispatch, rows);
      rows = initTokens(pairs, tokens, 'BTC', dispatch, rows);
      rows = initTokens(pairs, tokens, 'ETH', dispatch, rows);

      dispatch({
        type: 'SET_TOKEN_ROWS',
        payload: rows
      });

      const pairsStr = rows.map(item => `"${item.symbol}_${item.currency}"`).join(',');
      streemApi.subscribeTickers(tiker => {
        // const getPriceAndBase = (item) => ({
        //   price: item.spotPrice,
        //   base: item.pair.base
        // })

        // console.log(' tiker ', tiker);
  
        const getPriceAndBase = (item) => ({
          price: item.price,
          base: item.tokensPair.base
        })
        
        let rows = getState().chaingear.rows;
        if (Array.isArray(tiker)) {
          for(let i =0; i < tiker.length; i++) {
            rows = updateTokens(rows, tiker[i], getPriceAndBase)
          }

        } else {
          rows = updateTokens(rows, tiker, getPriceAndBase)
        }
        dispatch({
          type: 'SET_TOKEN_ROWS',
          payload: rows
        })  

        if (Array.isArray(tiker)) {
          updateRate(tiker, dispatch, getPriceAndBase)
        } else {
          updateRate([tiker], dispatch, getPriceAndBase)
        }
        
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

const exchangeRate = (state = { btc_usd: 1, eth_usd: 1}, action) => {
  switch (action.type) {
    case "CHANGE_EXCHANGE_RATE":
      return {...action.payload};    
    case "CHANGE_EXCHANGE_RATE_BTC":
      return {...state, btc_usd: action.payload};    
    case "CHANGE_EXCHANGE_RATE_ETH":
      return {...state, eth_usd: action.payload};    
    default:
      return state;
  }
}

const trades = (state = [], action) => {
  switch (action.type) {
    case "ADD_TRADE":{
      const arr = state.concat([action.payload]);
      return arr.slice(-10)    
    }
    case "SET_TRADE":
      return [...state, ...action.payload];    
    default:
      return state;
  }
}

// const groupBy = (items, key) => items.reduce(
//   (result, item) => ({
//     ...result,
//     [item[key]]: [
//       ...(result[item[key]] || []),
//       item,
//     ],
//   }), 
//   {},
// );

function groupBy(list, keyGetter) {
    const map = {};
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map[key];
        if (!collection) {
            map[key] = [item];
        } else {
            collection.push(item);
        }
    });
    return map;
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

export const calculateBuyOrders = (state) => {
  return byInterval(state.chaingear.orders.buyOrders, 5000, 40000, 1000, x => x.amount * x.spotPrice).map(x => ({
    count: x.count,
    amount: x.amountSum,
    sum: x.sum,
    spotPrice: x.spotPrice
  }))
}

export const calculateBuyOrdersTotal = (state) => {
  const items = calculateBuyOrders(state);
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

export const calculateSellOrdersTotal = (state) => {
    const items = calculateSellOrders(state);
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
  // _.orderBy(
  //   state.chaingear.orders.buyOrders
  //     .filter(item => item.amount), ['spotPrice'], ['asc']
  // ).slice(-20)

export const calculateSellOrders = (state) => {
  return byInterval(state.chaingear.orders.sellOrders, 5000, 40000, 1000, x => x.amount * x.spotPrice).map(x => ({
    count: x.count,
    amount: x.amountSum,
    sum: x.sum,
    spotPrice: x.spotPrice
  }))
}
  // _.orderBy(
  //   state.chaingear.orders.sellOrders
  //   .filter(item => item.amount), ['spotPrice'], ['asc']
  // ).slice(-20)



const orders = (state = { buyOrders: [], sellOrders: []}, action) => {
  switch (action.type) {
    case "SET_ORDERS":
      let buyOrders = action.payload
        .filter(o => o.type == 'BUY' )
        .map(item => ({ ...item, count: 1}));

      buyOrders = state.buyOrders.concat(buyOrders);

      // buyOrders = _.chain(buyOrders)
      //   .groupBy(x => +(x.spotPrice / 5) )
      //   // .groupBy(x => x.spotPrice  )
      //   .map((items, key) => {
      //     const amount = items.reduce((a, b) => a + b.amount, 0);
      //     const count = items.reduce((a, b) => a + b.count, 0);
      //     const spotPrice = +key;
      //     return {
      //       spotPrice: spotPrice * 5, 
      //       amount: amount,
      //       sum: spotPrice * amount,
      //       count: count
      //     }
      //   })
      //   .orderBy(x => x.spotPrice, ['desc'])
      //   .value()


      // buyOrders = buyOrders;


      let sellOrders = action.payload
        .filter(o => o.type == 'SELL' )
        .map(item => ({ ...item, count: 1}));

      sellOrders = state.sellOrders.concat(sellOrders);

      // sellOrders = _.chain(sellOrders)
      //   .groupBy(x => x.spotPrice)
      //   .map((value, key) => {
      //     const amount = value.reduce((a, b) => a + b.amount, 0);
      //     const spotPrice = +key;
      //     return {
      //       spotPrice: spotPrice, 
      //       amount: amount, 
      //       items: value,
      //       sum: spotPrice * amount,
      //       count: value.reduce((a, b) => a + b.count, 0)
      //     }
      //   })
      //   .orderBy(x => x.spotPrice, ['asc'])
      //   .value()


      // sellOrders = sellOrders; //.slice(-50);

      return {
        buyOrders: buyOrders,
        sellOrders: sellOrders
      };
    
    default:
      return state;
  }
}

export const reducer = combineReducers({
  rows: rowsReducer,
  exchangeRate,
  crowdsales: createDateReducer('CROWDSALES', []),
  crowdsalesDetails: createDateReducer('CROWDSALES_DETAILS'),
  tokensDetails: createDateReducer('TOKEN_DETAILS'),
  tokensPriceChart: createDateReducer('TOKEN_DETAILS_CHART'),
  trades,
  orders
})

export const showCrowdsalesDetails = (system) => ({
  type: 'CROWDSALES_DETAILS',
  payload: { system }
})

export const showTokensDetails = (symbol) => (dispatch) => {
  dispatch({
    type: 'TOKEN_DETAILS',
    payload: { symbol }  
  })
  dispatch({
    type: 'TOKEN_DETAILS_CHART',
    payload: { symbol } 
  })

  streemApi.open(config.CYBER_MARKETS_STREAM_API, () => {
    streemApi.subscribeTrades(trade => {
      // console.log(trade)
      if (Array.isArray(trade)) {
        dispatch({
          type: 'SET_TRADE',
          payload: trade
        })
      } else {
        dispatch({
          type: 'ADD_TRADE',
          payload: trade
        })
      }
    }, `"${symbol}_USD"`);

    let count = 0;
    streemApi.subscribeOrders(order => {
      if (count > 0) {
        return;
      }

      count++;
      console.log(order)

      dispatch({
        type: 'SET_ORDERS',
        payload: order
      })
    }, `"${symbol}_USD"`)
  })  
}


export const epic = combineEpics(
  loadDataEpic(
    'TOKEN_DETAILS_CHART',
    ({ symbol }) => marketApi.getHistoHour(symbol, 'USD')
  ),
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
     ({ symbol }) => chaingearApi.tokensDetails(symbol)
  )
) 
