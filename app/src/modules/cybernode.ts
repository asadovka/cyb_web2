var config = require('./config.js')

const initState = {
  chaingearApiAvailable: false,
  searchApiAvailable: false,
  marketApiAvailable: false
}

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case "CHECK_API":
        return { ...initState };
    case "SEARCH_API_AVAILABLE":
      return { searchApiAvailable: true }
    case "SEARCH_API_NOT_AVAILABLE":
      return { searchApiAvailable: true }
    case "MARKET_API_AVAILABLE":
      return { marketApiAvailable: true }
    case "MARKET_API_NOT_AVAILABLE":
      return { marketApiAvailable: false }
    case "CHAINGEAR_API_AVAILABLE":
      return { chaingearApiAvailable: true }
    case "CHAINGEAR_API_NOT_AVAILABLE":
      return { chaingearApiAvailable: false }
    default:
      return state
  }
}

import {Injector} from "../injector";
const {
  searchApi,
  marketApi,
  chaingearApi
} = Injector.of();

export const checkApi = () => (dispatch, getState) => {
  dispatch({ type: 'CHECK_API' });

  searchApi.test()
    .then(() => dispatch({ type: 'SEARCH_API_AVAILABLE'}))
    .catch(() => dispatch({ type: 'SEARCH_API_NOT_AVAILABLE'}))

  marketApi.test()
    .then(() => dispatch({ type: 'MARKET_API_AVAILABLE'}))
    .catch(() => dispatch({ type: 'MARKET_API_NOT_AVAILABLE'}))


  chaingearApi.test()
    .then(() => dispatch({ type: 'CHAINGEAR_API_AVAILABLE'}))
    .catch(() => dispatch({ type: 'CHAINGEAR_API_NOT_AVAILABLE'}))

};
