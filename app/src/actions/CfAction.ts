import {IAction} from "./IAction";

export class CfAction<T> implements IAction<T> {
  constructor(
    public type: string,
    public payload: T
  ) {
  }
}

export function cfAction<T>(type: string): (T) => CfAction<T> {
  return function (payload: T): CfAction<T> {
    return {type, payload} as CfAction<T>;
  };
}

