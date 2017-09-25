import {Action} from "redux";

export interface IAction<T> extends Action {
  readonly type: string;
  readonly payload: T;
}

type IActionCreator<T> = (T) => IAction<T>;
export function iAction<T>(type: string): IActionCreator<T> {
  return function (payload: T): IAction<T> {
    return {type, payload};
  };
}
