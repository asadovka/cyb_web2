import * as assignIn from "lodash/assignIn";
import {DefaultHttpService } from "./utils/HttpService";
import { DefaulChaingearApi } from './api/ChaingearApi';
import {DefaultMarketApi } from './api/MarketApi';
import {DefaultSearchApi, SearchApi} from 'cyber-search-js';

var config = require('./config.js')


export class Injector {
  http = new DefaultHttpService();
  searchApi = new DefaultSearchApi(config.CYBER_SEARCH_API);
  marketApi = new DefaultMarketApi(this.http);
  chaingearApi = new DefaulChaingearApi(this.http);

  static injectors = {};

  static of(name = "default") {
    if (this.injectors[name]) {
      return this.injectors[name];
    }

    const injector = new Injector();
    this.injectors[name] = injector;
    return injector;
  }
}


