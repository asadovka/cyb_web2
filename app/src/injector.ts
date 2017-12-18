import * as assignIn from "lodash/assignIn";
// import {EnvironmentConstants} from "./config/EnvironmentConstants";
import {DefaultHttpService } from "./http/HttpService";
import { DefaulChaingearApi } from './api/ChaingearApi';
import {DefaultMarketApi } from './api/MarketApi';
import {DefaultSearchApi, SearchApi} from 'cyber-search-js';

var config = require('./config.js')


export class Injector {
  http = new DefaultHttpService();
  searchApi = new DefaultSearchApi(config.CYBER_SEARCH_API);
  marketApi = new DefaultMarketApi(this.http);
  chaingearApi = new DefaulChaingearApi(this.http);

  // setService<T extends Injector[K], K extends keyof Injector>(name: K, service: T) {
  //   assignIn(this[name], service);
  // }

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


