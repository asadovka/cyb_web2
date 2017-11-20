import {combineEpics} from "redux-observable";
import {searchEpic} from "./searchEpic";
import {dataEpic} from "./dataEpic";

export const rootEpic = combineEpics(
  // searchEpic,
  dataEpic
);
