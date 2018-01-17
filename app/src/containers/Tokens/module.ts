import {Injector} from "../../injector";
import {Observable} from "rxjs";
import {combineReducers} from "redux";
import {combineEpics} from "redux-observable";
import _ from 'lodash';
import moment from 'moment'

const {
  chaingearApi,
  marketApi
} = Injector.of();

var config = require('./config.js')

const {
  http
} = Injector.of();
import streemApi from '../../api/MarketStreemApi';


export const getSystemLogoUrl = function (that, CYBER_CHAINGEAR_API) {
  var icon = (that.icon ? that.icon : that.system) || '';
  icon = icon.toString().toLowerCase();
  return CYBER_CHAINGEAR_API + icon + ".png";
};



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
          supply: item.specs ? item.specs.supply : 0,
          logo: getSystemLogoUrl(item, `${config.CYBER_CHAINGEAR_API}/logos/`),
          price: 0,
          amount: 0,
          procent: 0,
          currency
      })  
    }
  })
 // console.log(' init rows ', _rows)
 
  return _rows;
}


const calcProcent = (open, close) => open === 0 ? 0 : ((open - close) / open  * 100);


const initTokens = (pairs, tokens, currency, dispatch, rows) => {
  const usdPairs = pairs.filter(item => item.quote === currency).map(item => item.base);
  return addTokens(usdPairs, tokens, rows, currency);
}


export const closeConnection = () => () => {
  streemApi.close();
}

export const getPriceData = (state, symbol, currency) => {
  const prices = state.tokens.prices;
  if (!prices[symbol]) {
    return {
      data: [],
      loading: true,
      error: false
    }    
  }
  return prices[symbol];
}

export const calculateExchangeRate = (state) => state.tokens.exchangeRate;

export const calculateRows = (state) => {

  const search = state.tokens.search;
  const myTokens = state.tokens.myTokens;
  const _rows = state.tokens.rows.filter(row => row.price > 0 );
  const { btc_usd, eth_usd } = state.tokens.exchangeRate;
 
  const rows =  _rows.map(item => {
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

  // return rows;
  // return _.orderBy(rows, ['amount'], ['desc']);

  const items = rows.filter(x => myTokens.indexOf(x.symbol) === -1 && (search ? x.system.toLowerCase().indexOf(search.toLowerCase()) !== -1 : true));
  const myItems = rows.filter(x => myTokens.indexOf(x.symbol) !== -1).sort((a, b) => {
    const aIndex = myTokens.indexOf(a.symbol);
    const bIndex = myTokens.indexOf(b.symbol);
    return aIndex > bIndex ? 1 : -1;
  }) 

  return _.orderBy(items, ['amount'], ['desc']);// myItems.concat(_.orderBy(items, ['amount'], ['desc']));
}

export const resetTokens = () => (dispatch) => {
  localStorage.setItem('my-tokens', JSON.stringify([]));
  dispatch({
    type: 'RESET_MY_TOKENS'
  })
}

export const getMyTokens = (state) => {

  const search = state.tokens.search;
  const myTokens = state.tokens.myTokens;
  const _rows = state.tokens.rows.filter(row => row.price > 0 );
  const { btc_usd, eth_usd } = state.tokens.exchangeRate;
 
  const rows =  _rows.map(item => {
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

  // return rows;
  // return _.orderBy(rows, ['amount'], ['desc']);

  const items = rows.filter(x => myTokens.indexOf(x.symbol) === -1 && (search ? x.system.toLowerCase().indexOf(search.toLowerCase()) !== -1 : true));
  const myItems = rows.filter(x => myTokens.indexOf(x.symbol) !== -1).sort((a, b) => {
    const aIndex = myTokens.indexOf(a.symbol);
    const bIndex = myTokens.indexOf(b.symbol);
    return aIndex > bIndex ? 1 : -1;
  }) 

  return myItems;
}


const newTikers = {};


const updateRows = _.throttle((dispatch, getState) => {
  // console.log(' newTikers ', newTikers);
  dispatch({
    type: 'UPDATE_TOKENS',
    payload: newTikers
  })
}, 2000)

export const showAllTokens = () => (dispatch, getState) => {
  dispatch({
    type: 'SET_TOKENS_LOADING',
    payload: true
  })
  const myTokens = JSON.parse(localStorage.getItem('my-tokens') || "[]");
  dispatch({
    type: 'SET_MY_TOKENS',
    payload: myTokens
  });
  chaingearApi.getAllTokens()
    .then(tokens => new Promise(resolve => {
        streemApi.open(config.CYBER_MARKETS_STREAM_API, () => {
          streemApi.getPairs(pairs => resolve({ pairs, tokens }))
        })  
      }))
    .then(({ pairs, tokens }) => {
      // console.log('pairs>', pairs)
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
      const TIKER_INTERVAL = 1000 * 60 * 60 * 24 * 1; /*1 day*/
      streemApi.subscribeTickers(tiker => {   
        // console.log(' tiker ', tiker);     
        newTikers[tiker.pair.base] = {
          symbol: tiker.pair.base,
          amount: tiker.baseAmount,
          price: tiker.avgPrice,
          close: tiker.close,
          open: tiker.open
        };


        updateRows(dispatch, getState);        
      }, pairsStr, TIKER_INTERVAL)

      dispatch({
        type: 'SET_TOKENS_LOADING',
        payload: false
      })


      const from = moment().add(-7, 'day').valueOf();
      rows.forEach(row => {
        marketApi.getHistoHour(row.symbol, row.currency, from)
          .then(response => {
              const data = response.data.map(item => ({ time: item.time, price: item.close }));
              dispatch({
                type: 'SET_TOKEN_PRICE_CHART',
                payload: { data, symbol: row.symbol }
              })
          })
          .catch(() => {
            dispatch({
              type: 'SET_TOKEN_PRICE_CHART_ERROR',
              payload: row.symbol
            })
          })
      })
      // marketApi.getHistoHour(symbol, currency, from)
      //   .then(response => {
      //     // this.setState({
      //     //   loading: false,
      //     //   data: response.data.map(item => ({ time: item.time, price: item.close }))
      //     // })
      //   })
        // .catch(() => {
        //   this.setState({
        //     loading: false,
        //     error: true
        //   })
        // })
      // dispatch({
      //   type: 'SET_TOKEN_PRICE_CHART',
      // })
    })
}




const rowsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_TOKEN_ROWS":
      return [...action.payload];    

     case "UPDATE_TOKENS": {
       const data = action.payload;
       return state
        .map(item => {

          if (data[item.symbol]) {
            // console.log(' update ', item.symbol, data[item.symbol].price);
            return {
              ...item,
              symbol: item.symbol,
              amount: data[item.symbol].amount,
              price: data[item.symbol].price,
              open: data[item.symbol].open,
              close: data[item.symbol].close,
              procent: calcProcent(data[item.symbol].open, data[item.symbol].close)
            }
          }

          return item;
        });
     }
    default:
      return state;
  }
}

const exchangeRate = (state = { btc_usd: 1, eth_usd: 1}, action) => {
  switch (action.type) {
    case "UPDATE_TOKENS": {
       const btc_usd = newTikers['BTC'] ? newTikers['BTC'].price : state.btc_usd;
       const eth_usd = newTikers['ETH'] ? newTikers['ETH'].price : state.btc_usd;
       return { ...state, btc_usd, eth_usd };
    }
    default:
      return state;
  }
}

const loading = (state = false, action) => {
  switch (action.type) {
    case "SET_TOKENS_LOADING":
      return action.payload;    

    default:
      return state;
  }
}


export const changeSearch = (value) => ({
  type: 'CHANGE_TOKENS_SEARCH',
  payload: value
})

const search = (state = '', action) => {
  switch (action.type) {
    case "CHANGE_TOKENS_SEARCH":
      return action.payload;

    default:
      return state;
  }
}

export  const toggleMyToken = (symbol, checked) => (dispatch, getState) => {
  if (!checked){
    dispatch({
      type: 'REMOVE_MY_TOKENS',
      payload: symbol
    })
  } else {
    dispatch({
      type: 'ADD_MY_TOKENS',
      payload: symbol
    })
  }
  const tokens = getState().tokens.myTokens;
  localStorage.setItem('my-tokens', JSON.stringify(tokens));
}

const myTokens = (state = [], action) => {
  switch (action.type) {
    case "ADD_MY_TOKENS":{
      return state.concat(action.payload);    
    }

    case "REMOVE_MY_TOKENS":
      return state.filter(item => item !== action.payload);    

    case "SET_MY_TOKENS":{
      return action.payload;
    }

    case "RESET_MY_TOKENS": {
      return [];
    }

    default:
      return state;
  }
}

const prices = (state = {}, action) => {
  switch (action.type) {
    case "SET_TOKEN_PRICE_CHART": {
      const { symbol, data } = action.payload;
      return {
        ...state,
        [symbol]: {
          error: false,
          data
        }
      }
    }          
    case "SET_TOKEN_PRICE_CHART_ERROR": {
      const symbol = action.payload;
      return {
        ...state,
        [symbol]: {
          error: false
        }
      }
    }
    default:
      return state;
  }
}


export const reducer = combineReducers({
  loading,
  rows: rowsReducer,
  exchangeRate,
  search,
  myTokens,
  prices
})


export const epic = combineEpics({}) 
