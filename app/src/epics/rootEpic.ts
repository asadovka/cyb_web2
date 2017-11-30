import {combineEpics} from "redux-observable";
import {searchEpic} from "./searchEpic";
import {dataEpic} from "./dataEpic";

import { chaingearEpic } from '../modules/chaingear';

export const rootEpic = combineEpics(
  chaingearEpic,
  // searchEpic,
  dataEpic
);
