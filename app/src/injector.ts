import * as assignIn from "lodash/assignIn";
import {EnvironmentConstants} from "./config/EnvironmentConstants";
import {DefaultHttpService, HttpService} from "./http/HttpService";
import {DefaultSearchApi, SearchApi} from "./api/SearchApi";
import {DefaultMarketApi, MarketApi } from './api/MarketApi';
import {MockSearchApi} from "./api/mock/MockSearchApi";
import {DataApi, DefaultDataApi} from "./api/DataApi";
import {ChaingearApi, DefaulChaingearApi } from './api/ChaingearApi';

export class Injector {
  readonly http: HttpService = new DefaultHttpService();
  readonly searchApi: SearchApi = new DefaultSearchApi(this.http);
  readonly marketApi: MarketApi = new DefaultMarketApi(this.http);
  readonly chaingearApi: ChaingearApi = new DefaulChaingearApi(this.http);
  readonly dataApi: DataApi = new DefaultDataApi(this.http);

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

if (process.env.NODE_ENV === EnvironmentConstants.development) {
  const injector = Injector.of("dev");
  // Overwrite Services for development without real server
  injector.setService("searchApi", new MockSearchApi(injector.http));
}
