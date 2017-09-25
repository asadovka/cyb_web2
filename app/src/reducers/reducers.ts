import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import {CfState} from "../model/CfState";
import {searchReducer} from "./invite";

export const combinedReducers = combineReducers<CfState>({
  search: searchReducer,
  form: formReducer
});
