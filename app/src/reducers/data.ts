import {CfAction} from "../actions/CfAction";
import {combineReducers} from "redux";
import {DataState} from "../model/DataState";
import {
  BitcoinBlockResponse,
  BitcoinTxResponse, CfActions,
  EthereumBlockResponse,
  EthereumTxResponse
} from "../actions/CfActions";
import {FULFILLED, REJECTED} from "../actions/ActionsUtils";

const initialState = {
  error: false,
  loading: false,
  success: false,
  data: {}
};

export const dataReducer = combineReducers<DataState>({
  bitcoinBlock: createDateReducer(CfActions.GET_BITCOIN_BLOCK),
  bitcoinTx: createDateReducer(CfActions.GET_BITCOIN_TX),
  ethereumBlock: createDateReducer(CfActions.GET_ETHEREUM_BLOCK),
  ethereumTx: createDateReducer(CfActions.GET_ETHEREUM_TX),
});


function createDateReducer(type: string) {
  return function bitcoinBlockReducer(
    state: {} = initialState,
    action: CfAction<{}>
  ) {
    switch (action.type) {
      case type:
        return {
          error: false,
          loading: true,
          data: {}
        };
      case FULFILLED(type):
        return {
          success: true,
          loading: false,
          data: action.payload
        };
      case REJECTED(type):
        return {
          error: true,
          loading: false,
          data: {}
        };
      default:
        return state;
    }
  }
}
