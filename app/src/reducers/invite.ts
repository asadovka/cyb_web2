import {SearchState} from "../model/SearchState";
import {CfAction} from "../actions/CfAction";
import {CfActions} from "../actions/CfActions";
import {FULFILLED, REJECTED} from "../actions/ActionsUtils";

export function searchReducer(
  state: SearchState = {},
  action: CfAction<{}>
): SearchState {
  switch (action.type) {
    case CfActions.SEARCH:
      return {
        error: false,
        loading: true
      };
    case FULFILLED(CfActions.SEARCH):
      return {
        success: true,
        loading: false
      };
    case REJECTED(CfActions.SEARCH):
      return {
        error: true,
        loading: false
      };
    default:
      return state;
  }
}

