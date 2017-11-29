var config = require('./config.js')

import {combineReducers} from "redux";

const Avalible = (actionType) => (state = false, action) => {
  switch (action.type) {
    case `${actionType}_AVAILABLE`: return true;
    case `${actionType}_NOT_AVAILABLE`: return false;
    case `${actionType}_RESET`: return false;
    
    default:  
      return state;
  }
}

export const reducer = combineReducers({
  chaingearApiAvailable: Avalible("CHAINGEAR_API"),
  searchApiAvailable: Avalible("SEARCH_API"),
  marketApiAvailable: Avalible("MARKET_API")
}) 

import {Injector} from "../injector";
const {
  searchApi,
  marketApi,
  chaingearApi
} = Injector.of();

const checkApiCall = (testMethod, API_TYPE, dispatch) => {
  dispatch({ type: `${API_TYPE}_RESET`});
  testMethod()
    .then(() => dispatch({ type: `${API_TYPE}_AVAILABLE`}))
    .catch(() => dispatch({ type: `${API_TYPE}_NOT_AVAILABLE`}))
}

export const checkApi = () => (dispatch, getState) => {
  checkApiCall(() => searchApi.test(), 'SEARCH_API', dispatch);
  checkApiCall(() => marketApi.test(), 'MARKET_API', dispatch);
  checkApiCall(() => chaingearApi.test(), 'CHAINGEAR_API', dispatch);
};
