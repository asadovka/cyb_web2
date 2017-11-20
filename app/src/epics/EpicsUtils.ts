import {Observable} from "rxjs";
import {FULFILLED, REJECTED} from "../actions/ActionsUtils";
import {iAction, IAction} from "../actions/IAction";

export function mapPayload<T>(actionType: string): (T) => IAction<T> {
  return function (payload: T): IAction<T> {
    return iAction<T>(FULFILLED(actionType))(payload);
  };
}

export const mapAndDispatchPayload = (actionType, dispatch) => (payload) => {
  dispatch({
    type: FULFILLED(actionType),
    payload
  });
}

export const mapAndDispatchError = (actionType, dispatch) => (payload) => {
  dispatch({
    type: REJECTED(actionType),
    payload
  });
}


export function mapError<T>(actionType: string): (T) => Observable<IAction<T>> {
  return function (payload: T): Observable<IAction<T>> {
    return Observable.of(iAction<T>(REJECTED(actionType))(payload));
  };
}
