import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import {CfState} from "../model/CfState";
import {searchReducer} from "./search";
import {dataReducer} from "./data";
import { reducer as cybernode } from '../modules/cybernode';
import { reducer as chaingear} from '../modules/chaingear';

export const combinedReducers = combineReducers<CfState>({
  cybernode,
  chaingear,
  search: searchReducer,
  data: dataReducer,
  form: formReducer
});
