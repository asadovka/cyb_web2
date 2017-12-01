import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import { reducer as cybernode } from '../modules/cybernode';
import { reducer as chaingear} from '../modules/chaingear';
import { reducer as searchReducer } from '../modules/search';

export const combinedReducers = combineReducers({
  cybernode,
  chaingear,
  search: searchReducer,
  form: formReducer
});
