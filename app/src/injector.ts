import * as assignIn from "lodash/assignIn";
import {EnvironmentConstants} from "./config/EnvironmentConstants";
import {DefaultHttpService, HttpService} from "./http/HttpService";
import {ChaingearApi, DefaulChaingearApi } from './api/ChaingearApi';
import {DefaultSearchApi, SearchApi} from "./api/SearchApi";
import {DefaultMarketApi, MarketApi } from './api/MarketApi';

export class Injector {
  readonly http: HttpService = new DefaultHttpService();
  readonly searchApi: SearchApi = new DefaultSearchApi(this.http);
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


