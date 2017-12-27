import {combineReducers} from "redux";
import {combineEpics} from "redux-observable";

import _ from 'lodash';

export const getRows = state => {
  return _.orderBy(state.test.orders, ['amount'], ['desc']);
}

const items = [
  {
    symbol: 'BTC',
    amount: 10000,
    price: 16000
  },
  {
    symbol: 'ETH',
    amount: 8000,
    price: 770
  },
  {
    symbol: 'XRP',
    amount: 400,
    price: 1.2
  },
  {
    symbol: 'LTC',
    amount: 2000,
    price: 289
  },
  {
    symbol: 'DASH',
    amount: 1000,
    price: 1272
  }
];

const data = {};

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

function generateRandomTiker() {
  const index = randomInteger(0, 4);
  return {
    symbol: items[index].symbol,
    price: randomInteger(0, items[index].price + 100),
    amount: randomInteger(100, 10000)
  }  
}

export const showTokens = () => (dispatch, getState) => {

  dispatch({
    type: 'INIT_TEST_TOKENS',
    payload: items
  })

  setInterval(() => {
    const tiker = generateRandomTiker();
    console.log(' event > ', tiker);
    data[tiker.symbol] = tiker;
    updateTokens(tiker, dispatch, getState)
  }, 10);
}

const updateTokens = _.throttle((payload, dispatch, getState) => {
  // console.log('>>> ', data);
  dispatch({
    type: 'UPDATE_TEST_TOKENS',
    payload: data,      
  })
}, 1000)




// const updateTiker = (dispatch) => {
//   const tiker = generateRandomTiker();
//   console.log(tiker)

//   dispatch({
//     type: 'UPDATE_TEST_TOKENS',
//     payload: tiker,
//     meta: {
//       debounce: {
//         time: 200
//       }
//     }
//   })
// }

const orders = (state =[], action) => {
  switch (action.type) {
    case 'INIT_TEST_TOKENS':
      return [...action.payload];

    case 'UPDATE_TEST_TOKENS': {
      const { payload } = action;
      const newState = state.map(item => {
        if (payload[item.symbol]) return payload[item.symbol];
        return item;
      });
      return newState;
    }
    default:
      return state;
  }
}
import {Observable} from "rxjs";

export const reducer = combineReducers({
  orders
})

// export const test = action$ =>
//   action$
//     .ofType('UPDATE_TEST_TOKENS_2')
//     .groupBy(action => action.payload.symbol)
//     // .throttleTime(500)
//     .mergeMap(group => group.toArray())
//     .map(data => {
//       debugger
//     })
//     //.map(action => action.value)
//     // .map(data => {
//     //   debugger
//     // })

// export const epic = combineEpics(
//   test
// )
