import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import {CfState} from "../model/CfState";
import {searchReducer} from "./search";
import {dataReducer} from "./data";

export const combinedReducers = combineReducers<CfState>({
  search: searchReducer,
  data: dataReducer,
  form: formReducer
});
