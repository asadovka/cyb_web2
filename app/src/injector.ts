import * as assignIn from "lodash/assignIn";
import {EnvironmentConstants} from "./config/EnvironmentConstants";
import {DefaultHttpService, HttpService} from "./http/HttpService";
import {ChaingearApi, DefaulChaingearApi } from './api/ChaingearApi';
import {DefaultMarketApi, MarketApi } from './api/MarketApi';
import {DefaultSearchApi, SearchApi} from 'cyber-search-js';

var config = require('./config.js')


export class Injector {
  readonly http: HttpService = new DefaultHttpService();
  readonly searchApi: SearchApi = new DefaultSearchApi(config.CYBER_SEARCH_API);
  readonly marketApi: MarketApi = new DefaultMarketApi(this.http);
  readonly chaingearApi: ChaingearApi = new DefaulChaingearApi(this.http);

  setService<T extends Injector[K], K extends keyof Injector>(name: K, service: T) {
    assignIn(this[name], service);
  }

  private static injectors: { [key: string]: Injector } = {};

  static of(name = "default"): Injector {
    if (this.injectors[name]) {
      return this.injectors[name];
    }

    const injector = new Injector();
    this.injectors[name] = injector;
    return injector;
  }
}


