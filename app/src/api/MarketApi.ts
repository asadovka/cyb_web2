import {HttpService} from "../http/HttpService";
import {SearchResponse} from "../actions/CfActions";

var config = require('./config.js')

export interface MarketApi {
  test(): Promise<any>;
}

export class DefaultMarketApi implements MarketApi {
  constructor(
    private readonly http: HttpService
  ) {
  }


  test() {
    return this.http.GET(
      `${config.CYBER_MARKETS_API}/`
    );
  }
}
