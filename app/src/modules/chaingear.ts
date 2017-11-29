import {Injector} from "../injector";
const {
  chaingearApi,
  marketApi
} = Injector.of();

var config = require('./config.js')


const initState = {
  tokens: [],
  statistics: []
};

export const TIKER_INTERVAL = 1000 * 60 * 60 * 24 * 1; /*1 day*/

export const reducer = (state = initState, action) => {
  switch (action.type) {
     case 'SET_TOKENS':
       return {
         ...state,
         tokens: action.payload.tokens,
         statistics: action.payload.statistics
       }
    default:
      return state;
  }
}

export const getSystemLogoUrl = function (that, CYBER_CHAINGEAR_API) {
  var icon = (that.icon ? that.icon : that.system) || '';
  icon = icon.toString().toLowerCase();
  return CYBER_CHAINGEAR_API + icon + ".png";
};


export const showAllTokens = () => (dispatch, getState) => {
  Promise.all([
    chaingearApi.getAllTokens(), 
    marketApi.getTokensStatistics()
  ]).then(data => {
    dispatch({
      type: 'SET_TOKENS',
      payload: {
        tokens: data[0],
        statistics: data[1]
      }
    })
  })
}
