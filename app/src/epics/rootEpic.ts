import {combineEpics} from "redux-observable";
import {searchEpic} from "./searchEpic";

export const rootEpic = combineEpics(
  searchEpic
);
