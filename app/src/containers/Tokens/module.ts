import {Injector} from "../../injector";
import {Observable} from "rxjs";
import {combineReducers} from "redux";
import {combineEpics} from "redux-observable";
import _ from 'lodash';

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

const calcProcent = (a, b) => a === 0 ? 0 : ((a - b) / a  * 100);


const initTokens = (pairs, tokens, currency, dispatch, rows) => {
  const usdPairs = pairs.filter(item => item.quote === currency).map(item => item.base);
  return addTokens(usdPairs, tokens, rows, currency);
}


export const closeConnection = () => () => {
  streemApi.close();
}



export const calculateExchangeRate = (state) => state.tokens.exchangeRate;

export const calculateRows = (state) => {
  const _rows = state.tokens.rows.filter(row => row.price > 0);
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

  return rows;
  // return _.orderBy(rows, ['price'], ['desc']);
}


const newTikers = {};
const updateRate = (data, dispatch) => {
  const price = data.price;
  const base = data.tokensPair.base;
  if (base === 'BTC') {
    dispatch({
      type: 'CHANGE_EXCHANGE_RATE_BTC',
      payload: price
    })
  }

  if (base === 'ETH') {
    dispatch({
      type: 'CHANGE_EXCHANGE_RATE_ETH',
      payload: price
    })
  }
}


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
        newTikers[tiker.tokensPair.base] = {
          symbol: tiker.tokensPair.base,
          amount: tiker.baseAmount,
          price: tiker.price,
        };


        updateRows(dispatch, getState);
        updateRate(tiker, dispatch)
        
      }, pairsStr, TIKER_INTERVAL)

        dispatch({
          type: 'SET_TOKENS_LOADING',
          payload: false
        })
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
              procent: calcProcent(item.price, data[item.symbol].price)
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

const loading = (state = false, action) => {
  switch (action.type) {
    case "SET_TOKENS_LOADING":
      return action.payload;    

    default:
      return state;
  }
}


export const reducer = combineReducers({
  loading,
  rows: rowsReducer,
  exchangeRate,
})


export const epic = combineEpics({}) 
