import {combineEpics} from "redux-observable";

import { chaingearEpic } from '../modules/chaingear';
import { searchEpic } from '../modules/search';

export const rootEpic = combineEpics(
  chaingearEpic,
  searchEpic,
);
