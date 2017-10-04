import {SearchState} from "../model/SearchState";
import {CfAction} from "../actions/CfAction";
import {CfActions, SearchResponse} from "../actions/CfActions";
import {FULFILLED, REJECTED} from "../actions/ActionsUtils";

const initialState = {
  data: {
    items: []
  }
};

export function searchReducer(
  state: SearchState = initialState,
  action: CfAction<SearchResponse>
): SearchState {
  switch (action.type) {
    case CfActions.SEARCH:
      return {
        error: false,
        loading: true,
        data: {
          items: []
        }
      };
    case FULFILLED(CfActions.SEARCH):
      return {
        success: true,
        loading: false,
        data: action.payload
      };
    case REJECTED(CfActions.SEARCH):
      return {
        error: true,
        loading: false,
        data: {
          items: []
        }
      };
    default:
      return state;
  }
}

